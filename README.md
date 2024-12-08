# Simple To-Do List Application

## Overview
This is a simple To-Do list application built with Laravel for the backend and Angular for the frontend. The application allows users to register, log in, and manage their tasks. Users can add, edit, soft delete, and restore tasks. Tasks can be categorized, filtered, and searched.

## Features
- User registration and login
- Add, edit, and soft delete tasks
- Restore soft-deleted tasks
- Task categories (e.g., Work, Personal, Urgent)
- Task status (e.g., pending, completed)
- Task filtering and sorting
- Task search by title or description
- Pagination for task listing
- Due dates for tasks
- Basic styling with css and angular material

## Requirements
- PHP 7.4 or higher
- Composer
- Node.js and npm
- MySQL or any other supported database

## Setup Instructions

### Backend (Laravel 10)
1. Clone the repository:
    ```bash
    git clone https://github.com/yousefhussen/InvadeTask.git
    cd todo-list-app
    ```

1. Navigate to the backend directory:
    ```bash
    cd BackEnd
    ```

2. Install dependencies:
    ```bash
    composer install
    ```

3. Copy the `.env.example` file to `.env` and configure your database connection:
    ```bash
    cp .env.example .env
    ```

4. Generate an application key:
    ```bash
    php artisan key:generate
    ```

5. Run the migrations:
    ```bash
    php artisan migrate
    ```

6. Seed the database (optional):
    ```bash
    php artisan db:seed
    ```

7. Start the development server:
    ```bash
    php artisan serve
    ```

### Frontend (Angular 16)
1. Navigate to the frontend directory:
    ```bash
    cd FrontEnd
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the Angular development server:
    ```bash
    ng serve
    ```

## API Endpoints
- `GET /api/tasks` - Retrieve a list of tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update an existing task
- `DELETE /api/tasks/{id}` - Soft delete a task
- `PATCH /api/tasks/{id}/restore` - Restore a soft-deleted task

## Front-End Functionality
- Display list of tasks with options to add, edit, delete, filter, and sort
- Search tasks by title or description
- Form validation and AJAX requests to interact with API endpoints

## Bonus Features
- Task filtering (e.g., show only completed or pending tasks)
- Due dates for tasks

## Security
- User authentication is implemented using Laravel's Fortify.
- Passwords are hashed using bcrypt.
- CSRF protection is enabled by default in Laravel.
- API routes are protected using Laravel's Sanctum middleware.
**Note: In This project Sanctum is used to authintecate user through session but still implemented some tokens logic to test using Postman.**


## Performance
- Eloquent ORM is used for efficient database interactions.
- Pagination is implemented to handle large sets of tasks efficiently.
- <span style="color:green">Debouncing the Search And Throttling the api for great smooth experience.</span>


## Styling
- Basic styling is applied using angular material to ensure the application is visually appealing and user-friendly.
- Custom CSS is used for additional styling needs.

## Postman Workspace
[You can find the Postman workspace for this project here](https://app.getpostman.com/join-team?invite_code=83ac63c88d393507bbeee31ac4132688&target_code=2c5dd9e6d38b89cb7b7201d17afca68d).

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, please contact yousefhussen139@gmail.com .

