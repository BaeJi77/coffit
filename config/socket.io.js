const SocketIO = require('socket.io');
const redisAdapter = require('socket.io-redis');

const chattingRoomService = require('../services/chattingRoomService');
const chattingMessageService = require('../services/chattingMessageService');

const logger = require('../config/logger');

let redisConfig = require('./redis_config')[process.env.NODE_ENV];
console.log(redisConfig);

module.exports = (server, app) => {
    const io = SocketIO(server);
    io.adapter(redisAdapter(redisConfig));
    const chatting = io.of('/chattings');

    app.set('io', io);

    chatting
        .on('connection', (socket) => {
            // roomId가 없는 경우. 처음 메세지보낼 때 방이 만들어지고 그것에 대하여 join을 한다.
            socket.on('firstConnection', (roomInformationWithMessage) => {
                logger.info('[socket.io] [firstConnection] client request first connection');
                console.log(roomInformationWithMessage);
                logger.info(roomInformationWithMessage);
                chattingRoomService.makeNewChattingRoomWhenUserSendFirstMessage(roomInformationWithMessage.room)
                    .then((madeChattingRoom) => {
                        let firstMessage = roomInformationWithMessage.message; // 딱 방만들었을 때는 무조건 방이 하나이기 때문에
                        firstMessage.connectionLength = 1;
                        firstMessage.chatting_room_id = madeChattingRoom.id;

                        chattingMessageService.makeNewChattingMessageWithMessageRead(firstMessage);

                        let roomNumber = 'room#' + madeChattingRoom.id;
                        logger.info(roomNumber);
                        socket.join(roomNumber);
                        chatting.in(roomNumber).emit('firstConnect', madeChattingRoom);
                    });
            });

            // 기존 대화방이 있는 경우
            socket.on('joinRoom', (requestData) => {
                let roomNumber = "room#" + requestData.chatting_room_id;
                logger.info('request exist connection');
                logger.info(roomNumber);
                socket.join(roomNumber);
            });

            // 해당 소켓이 채팅방을 나오는 경우
            socket.on('closeRoom', (requestData) => {
                let roomNumber = "room#" + requestData.chatting_room_id;
                logger.info("close room");
                logger.info(roomNumber);
                socket.leave(roomNumber);
            });

            socket.on('disconnect', () => {
                console.log('disconnect');
                console.log("bye bye");
            });

            socket.on('sendMessage', (socketRequestData) => {
                let roomNumber = "room#" + socketRequestData.chatting_room_id;
                console.log(roomNumber);
                console.log(socket.adapter.rooms);
                socketRequestData.connectionLength = socket.adapter.rooms[roomNumber].length;
                chattingMessageService.makeNewChattingMessageWithMessageRead(socketRequestData)
                    .then((makeNewChattingMessageResult) => {
                        chatting.in(roomNumber).emit('sendMessage', socketRequestData);
                    });
            })
        });
};