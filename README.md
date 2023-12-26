# Academic Projects Management Platform

A full stack web platform for algerian academic projects (a diploma / a startup), built with React 18 (Javascript) and tailwindcss; Laravel 10, Mysql and Vonage. This is an academic project I built with my team as the final project of the first year of the higher cycle (third year in total).

There is 6 types of users: super admin, student, teacher, internship service, scientific committee, headmaster.
Students can team up and submit their startup idea for approval by the scientific committee of their establishment. Each project is related to an academic establishment, and will have a project holder and a supervisor with a team of students. The project holder will be able to submit his project to the scientific committee of his establishment, which will have the possibility to accept or reject the project. If the project is accepted, the platform handles the supervising process and concludes with a thesis defense.


## Get Started

### Frontend
Don't forget to fill the env variable with api url.
```
cp .env.example .env
npm / yarn / pnpm install
npm / yarn / pnpm dev
```

### Backend
Don't forget to change your env variables: db connection, email credentials, front-end urls and vonage keys.
```
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan storage:link
php artisan ser
```
In another shell, start the background queue that handles notifications and jobs using the command:
```
php artisan queue:work
```

