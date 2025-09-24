# Full-Stack Fracttal

This is a full-stack todo list application built with React (with Vite and Redux), Node.js, and PostgreSQL.

## Project Setup with Docker

This project is configured to run with Docker Compose.

1.  **Build and run the services:**

    ```bash
    docker-compose up --build
    ```

2.  **Access the application:**

    -   Frontend: [http://localhost](http://localhost)
    -   Backend: [http://localhost:3001](http://localhost:3001)

3.  **To stop the services:**

    ```bash
    docker-compose down
    ```

## Manual Project Setup

### Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add the following environment variables:
    ```
    DB_USER=fracttal_user
    DB_HOST=localhost
    DB_DATABASE=fracttal_db
    DB_PASSWORD=fracttal_password
    DB_PORT=5432
    JWT_SECRET=supersecret
    ```
4.  Create the database and tables using the `backend/src/database/database.sql` file.
5.  Start the backend server:
    ```bash
    npm start
    ```

### Frontend

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```

## Postman Collection

A Postman collection (`Postman_Collection.json`) has been provided in the root directory to help you test the backend API endpoints.

**How to use it:**

1.  **Import into Postman:** Open Postman, click on "Import" (usually in the top left corner), and select the `Postman_Collection.json` file.
2.  **Environment Variables:** You will need to set up an environment in Postman to manage variables like `YOUR_JWT_TOKEN`. After logging in (using the "Login User" request), copy the `token` from the response and set it as the value for `YOUR_JWT_TOKEN` in your Postman environment.
3.  **Replace Placeholders:** Remember to replace `YOUR_JWT_TOKEN` in the Authorization headers of protected requests with the actual JWT token obtained after a successful login. Also, replace `:id` in the URL paths for update and delete operations with actual IDs from your database.

## Business Intelligence Questions

The following are the business intelligence questions from the challenge, which can be answered by running SQL queries against the database.

1.  **User Engagement Analysis:** What is the average number of tasks created per user in the last 30 days, and how does it compare to the previous 30 days?
2.  **Completion Rate Trends:** What is the daily task completion rate over the last 90 days, grouped by priority level?
3.  **Category Performance:** Which categories have the highest and lowest completion rates, and what is the average completion time for each category?
4.  **User Productivity Patterns:** What are the peak hours and days of the week when users create more tasks, and when do they complete them?
5.  **Overdue Task Analysis:** How many tasks are currently overdue, grouped by user and category, and what is the average number of days they are overdue?
6.  **Tag Usage Statistics:** What are the most frequently used tags, and which tags are associated with the highest completion rates?
7.  **User Retention Metrics:** How many users have created at least one task in each of the last 4 weeks, and what is the week-over-week retention rate?
8.  **Priority Distribution Analysis:** What is the distribution of tasks across priority levels for active users (users who have logged in in the last 7 days)?
9.  **Seasonal Trends:** How does task creation and completion vary by month over the last year, and there are any seasonal patterns?
10. **Performance Benchmarking:** Which users are in the top 10% for task completion rate, and what is the average number of tasks they handle concurrently?