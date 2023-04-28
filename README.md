# Installation and setup

Backend:

- install docker and docker compose
- navigate to backend folder
- install sail 
    *  composer require laravel/sail --dev
    *  php artisan sail:install
- starting the app
    * ` ./vendor/bin/sail up `
- creatign database table:
    * `sail artisan migrate`
- seeding fake data in database:
    * `sail artisan db:seed`
    
  Frontend:
  
  - have npm installed
  - enter frontend folder
  - run this to install dependecies:
    * `npm install`
  - run this to start react app:
    * `npm start`
