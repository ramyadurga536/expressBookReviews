# Bookshop API

A Node.js Express REST API for managing books and user authentication, using PostgreSQL and Sequelize ORM.

## Features

- User registration and login with JWT authentication
- CRUD operations for books
- Protected routes for authenticated users
- PostgreSQL database integration via Sequelize
- Docker support for easy setup

## Project Structure

```
.
├── .env
├── docker-compose.yml
├── index.js
├── package.json
├── db/
│   ├── init.sql
│   └── sequelize.js
├── middleware/
│   └── authMiddleware.js
├── model/
│   ├── Book.js
│   └── User.js
├── router/
│   ├── auth_users.js
│   └── general.js
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (for database)

### Setup

1. **Clone the repository**

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**

   Edit `.env` as needed (defaults provided):
   ```
   PORT=5000
   SECRET_KEY=fingerprint_customer
   DB_NAME=bookstoredb
   DATABASE_URL=postgresql://postgres:postgres@localhost:5433/bookstoredb
   ```

4. **Start PostgreSQL with Docker to init database**
   ```sh
   docker-compose up -d
   ```

5. **Start the server**
   ```sh
   npm start
   ```

## API Endpoints

### Authentication

- `POST /customer/register` — Register a new user
- `POST /customer/login` — Login and receive JWT token

### Books

- `GET /book/` — List all books (requires authentication)
- `POST /book/register` — Add a new book (requires authentication)
- `PUT /book/update/:id` — Update a book by ID (requires authentication)
- `DELETE /book/delete/:id` — Delete a book by ID (requires authentication)
- `GET /book/id/:id` — Get book details by ID (requires authentication)
- `GET /book/author` — Get books by author (requires authentication)
- `GET /book/title` — Get books by title (requires authentication)
- `GET /book/review/:id` — Get reviews for a book (requires authentication)

### Health Check

- `GET /health` — Check server status

## Notes

- Use the JWT token in the `Authorization` header as `Bearer <token>` for protected routes.
- Database tables are initialized via [db/init.sql](db/init.sql).

## License

MIT
