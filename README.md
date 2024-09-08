# Vue - Node - MySQL - Sequelize Demo

## About
This demo demonstrates the integration of MySQL with Sequelize in a simple student-results example. The backend is powered by Node.js and Express, while the frontend is built with Vue 3, Typescript, and Vite. It also utilizes Tailwind CSS and DaisyUI for a clean UI.

## Used Frameworks / Libraries
- **Express.js**: A web application framework for Node.js.
- **Mysql2**: A fast and feature-rich MySQL client for Node.js.
- **Sequelize**: A powerful ORM for Node.js to interact with MySQL.
- **Vue 3**: A progressive JavaScript framework for building user interfaces.
- **Typescript**: A strongly typed programming language that builds on JavaScript.
- **Vite**: A build tool that significantly improves the development experience.
- **DaisyUI**: A plugin for Tailwind CSS that provides a set of accessible and reusable UI components.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **vite-plugin-pages**: A Vite plugin for file-based routing.

## Installation
1. Clone the repository
2. Install dependencies:
    ```sh
    pnpm install
    ```
3. Create a .env file in the root directory and provide your MySQL credentials
    ```
    MYSQL_HOST=your_mysql_host
    MYSQL_USERNAME=your_mysql_user
    MYSQL_PASSWORD=your_mysql_password
    MYSQL_DB=your_mysql_database
    ```

## To Start the Application
1. Build the project:
   ```sh
   pnpm run build
   ```
2. Start the server:
   ```sh
   pnpm run server:start
   ```
3. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## To Restart the Server
To restart all server instances, run:
```sh
pnpm run server:start all
```

## To Stop the Server
To stop all server instances, run:
```sh
pnpm run server:delete all
```

## To List All Server Instances
To list all running server instances, run:
```sh
pnpm run server:list
```

## Author
Milan Dadhaniya

## License
This project is licensed under the MIT License.
