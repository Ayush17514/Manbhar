# Seeding the Database

This project includes a `seed.sql` file that you can use to populate your database with sample data. This is useful for testing and development purposes.

## Prerequisites

Before you can seed the database, you need to have a MySQL database set up and configured for the project. The database configuration can be found in the `config/db.php` file.

## How to Seed the Database

1.  **Open a terminal or command prompt.**
2.  **Navigate to the root directory of the project.**
3.  **Run the following command:**

    ```bash
    mysql -u YOUR_USERNAME -p YOUR_DATABASE_NAME < seed.sql
    ```

    Replace `YOUR_USERNAME` with your MySQL username and `YOUR_DATABASE_NAME` with the name of your database.

4.  **Enter your MySQL password when prompted.**

This will execute the SQL commands in the `seed.sql` file and populate your database with the sample data.
