<img src="Ri-Event.jpeg" alt="Opis slike" width="1000" height="600">

# Ri-Event App

[![PHP Version](https://img.shields.io/badge/PHP-8.1.12-purple)](https://www.npmjs.com/package/Ri-Event)
[![NPM Version](https://img.shields.io/badge/npm-8.11.0-blue)](https://www.npmjs.com/package/Ri-Event)
[![LARAVEL Downloads](https://img.shields.io/badge/Laravel-10.3.3-red)](https://www.npmjs.com/package/Ri-Event)
[![Github Repo Size](https://img.shields.io/github/repo-size/LukaBis/Ri-Event.svg)](https://github.com/LukaBis/Ri-Event)
[![Contributors](https://img.shields.io/github/contributors/LukaBis/Ri-Event.svg)](https://github.com/LukaBis/Ri-Event/graphs/contributors)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Introduction

This app allows you to search for events in Rijeka. Users and organizastions can also create events using this app. You can specify what type of event are you hosting, when it starts, at what location, add some image for your event etc. 

After user creates an account on registration form, he or she can then search and see what type of events they want to attend.


## Installation and setup

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


## Technologies used

- Laravel
- Docker
- Laravel Sail
- Laravel Sanctum
- Laravel Fortify
- React
- Material UI
