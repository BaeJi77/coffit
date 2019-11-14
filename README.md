---

## Development Environment

- Development OS : MacOS Catalina(ver 10.15)
- Cloud Computing OS
    - EC2 : ubuntu 18.04
- DB
    - RDS : MySQL Community (v5.7.22)
    - Redis: Elasticache Redis (v5.0.3)
- Storage : AWS S3
- Node.js : v12.13.0
- NPM: 6.12.1
- Always execute `npm update`

---

## Setting Development

- System setting
1. Fork this project
2. You must set-up the configure file
    - Check config file below this wiki
3. You must download library by using `npm install`.
4. Run express server. `node bin/www` and `npm start`
    - Before running server check the port.
- I have aws_s3.json file that configurate aws s3 automated set-up.
    - `modules/image_upload.js` use auto set up aws s3.
    - `aws.config.loadFromPath(__dirname+'/../config/aws_s3.json');` in `image_upload.js`
- There are almost express configuration contexts in `app.js` or `/bin/www`

---

## Configuration setting

- Configuration file list

        config/aws_s3.json
        - you can take in aws IAM
        
        config/fcm_key.json
        - google fcm service
        
        config/redis-config.json
        - local in development env 
        - Elasticache in aws inMemory service
        
        config/sentry.json
        - this is error check service
        
        config/sequelize_config.json
        - ORM config file

- aws_s3.json

        {
          "accessKeyId": "KeyId",
          "secretAccessKey": "AccesKey",
          "region": "ap-northeast-2"
        }

- fcm_key.json

        {
          "student": {
            "type": "service_account",
            "project_id": "student_id",
            "private_key_id": "key_id",
            "private_key": "key_id",
            "client_email": "client_email",
            "client_id": "client_id",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/...."
          },
          "trainer": {
            "type": "service_account",
            "project_id": "trainer_id",
            "private_key_id": "key_id",
            "private_key": "key_id",
            "client_email": "client_email",
            "client_id": "client_id",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/...."
          }
        }

- redis_config.json

        {
          "development": {
            "host": "localhost",
            "port": "6379"
          },
          "test": {
        
          },
          "production": {
            "host": "Elasticache endpoint",
            "port": "6379"
          }
        }

- sentry.json

        {
          "dsn": "https://.......@sentry.io/.....",
          "environment": "development"
        }

- sequelize_config.json

        "development": {
              "username": "YOUR_DATABASE_USERNAME",
              "password": "YOUR_DATABASE_USER_PASSWORD",
              "database": "YOUR_DATABASE_NAME",
              "host": "AWS RDS End-point",
              "dialect": "mysql",
              "dialectOptions": {
                "useUTC": false,
                "dateStrings": true
              },
              "timezone": "USER_TIMEZONE",
              "charset": "utf8",
              "collate": "utf8_general_ci"
          },
        "test": {
        	...
        },
        "production": {
        	...
        }

---

## Monitoring Tool

- PM2 Plus
    - Node.js monitor APM tool

![스크린샷 2019-11-07 오전 12 52 47(2)](https://user-images.githubusercontent.com/27915410/68853030-67318a00-071c-11ea-9c4a-98850d41a5c1.png)

- AWS CloudWatch
    - AWS cloud service 안정석 체크 tool

![스크린샷 2019-11-07 오전 12 54 56(2)](https://user-images.githubusercontent.com/27915410/68853099-87614900-071c-11ea-8040-7389a9e52e45.png)

---

## Load test

- Jmeter

<img width="1346" alt="스크린샷 2019-11-07 오전 12 52 52" src="https://user-images.githubusercontent.com/27915410/68853279-f179ee00-071c-11ea-9b59-661376a14b3c.png">


