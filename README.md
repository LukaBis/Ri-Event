# Installation and setup

- install docker and docker compose
- install sail 
    *  composer require laravel/sail --dev
    *  php artisan sail:install
- starting the app
    * ` ./vendor/bin/sail up `
- executing php commands:
    * ` sail php script.php `
    * example: ` sail artisan make:model Event `
- executing composer commands:
    * example: `sail composer require laravel/sanctum`
- creatign database table:
    * `sail artisan migrate`
- seeding fake data in database:
    * `sail artisan db:seed`