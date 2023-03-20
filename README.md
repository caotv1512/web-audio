## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# copy environment file

cp env/.env.local .env

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

mysql://
ba326c9433b5f5
:
8943f784
@
us-cdbr-east-06.cleardb.net
/heroku_07728b6921b7f31?
reconnect=true

- Update ubuntu and Install MY-SQL

               $ sudo apt update

               $ sudo apt install mysql-server

  - Change method authenticated user to mysql_native_password

             $ sudo mysql

             mysql: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';

             mysql:  exit

    +Test connect mysql

             $ mysql -u root -p

    +Enter password: 12345678

             mysql:  exit

* 3.  App Node-JS
      Install npm

                      $ sudo apt install npm

             +Clone project ( your project or use my project at https://github.com/nguyenthanhson1620...)

                      $ sudo git clone https://github.com/.........

                      $ cd your-project

                      $ sudo npm install

             +Allow port (port in your app EX: 3000)

                      $ sudo ufw enable

                      $ sudo ufw allow 3000

             +Run test app (index.js is app name)

                      $ sudo node index.js

             +Check in browser and check connect to mysql http://hostname:3000/mysql

4. Run app in background using PM2

- Install PM2

                $ sudo npm i pm2 -g

       +Start app with app name = demo

                $ sudo pm2 start index.js --name demo

- Bonus
  +Show log

                $ sudo pm2 log

        + Show list app in PM2

                $ sudo pm2 list

       + Stop app using

                $ sudo pm2 stop all

       + Reloac app using

                $ sudo pm2 reload all
