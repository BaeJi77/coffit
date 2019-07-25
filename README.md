# COFFIT PROJECT
- Team: New Black. (SoftWare Maestro 10th.)
  - EUN SEOK, JEONG [@Github](https://github.com/newwhite)
  - JI SOO, LEE [@Github](https://github.com/jisooleee)
  - JI HOON, BAE [@Github](https://github.com/BaeJi77)
  
- Project name : COFFIT.
  - online 1:1 PT service
  - Exercising together.
  

------------------------------------------------------------------------------------------------------------------

## Back-end development Environment

- OS : MacOS Mojave(ver10.14.5)
  - ec2 : ubuntu 18.04
- DB: mysql
  - rds : Not construct 
- storage : aws s3
- Node.js : v12.5.0

- Always execute `npm update`.

------------------------------------------------------------------------------------------------------------------


1. fork this project

2. and your mysql server start

   ``````
   mysql.server start
   ``````

   - And you check config/sequelize_config. 

   ```
   "development": {
     "username": "YOUR_DATABASE_USERNAME",
     "password": "YOUR_DATABASE_USER_PASSWORD",
     "database": "YOUR_DATABASE_NAME",
     "host": "127.0.0.1",
     "dialect": "mysql",
     "dialectOptions": {
       "useUTC": false,
       "dateStrings": true
     },
     "timezone": "USER_TIMEZONE",
     "charset": "utf8",
     "collate": "utf8_general_ci"
   },
   ```

3. You must download library by using `npm install`.
4. Run express server. `node bin/www` and `npm start`
   - Before running server check the port.



- I have aws_s3.json file that configurate aws s3 automated set-up.
  - `modules/image_upload.js` use auto set up aws s3.
  - ``aws.config.loadFromPath(__dirname+'/../config/aws_s3.json');`` in `image_upload.js`



- There are almost express configuration contexts in `app.js` or `/bin/www`



