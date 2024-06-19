# Slidely Backend

## Description

This is the backend server for the Slidely Form App. It is built with Express and TypeScript, using a JSON file as a database.

## Endpoints

- `/ping`: A GET request that always returns True.
- `/submit`: A POST request with parameters "name", "email", "phone", "github_link", and "stopwatch_time".
- `/read`: A GET request with query parameter "index" which is a 0-index for reading the (index+1)th form submission.
- `/delete`: A DELETE request with query parameter "index" which deletes the (index+1)th form submission.
- `/edit`: A PUT request with query parameter "index" and body parameters "name", "email", "phone", "github_link", and "stopwatch_time".
- `/search`: A GET request with query parameter "email" which returns all form submissions matching the given email.

## Running the Server

Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
Install dependencies:
   ```bash
   
   npm install
   ```
Start the server:

   ```bash
   npm run dev
   ```

The server will be running on http://localhost:3000.


   
