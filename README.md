## User Management Microservices Project

### About the Project
This project implements a microservices architecture for user management, consisting of three services:

1. **API Gateway (api-gateway, running on port 3000)**
2. **User Management (user-management, running on port 3001)**
3. **Block User (block-user, running on port 3002)**

The services share a centrally configured PostgreSQL database and Redis for caching.

#### API Gateway
- The `api-gateway` service acts as a client to the other services. It handles HTTP requests, performs authentication, and extracts the user ID, which is then used by the other services.

#### User Management
- The `user-management` service provides CRUD (Create, Read, Update, Delete) operations for user management. It interacts with the database and the Redis cache to manage user data.

#### Block User
- The `block-user` service is responsible for blocking and unblocking users.

All API endpoints are secured except for creating a new user and fetching all users.

For detailed API documentation, refer to [API Documentation](https://documenter.getpostman.com/view/4972638/2sA3kRHiCP).

### Prerequisites
Before running the project, ensure you have the following software installed and running:

- Node.js (v14 or higher)
- PostgreSQL
- Redis

### Getting Started

1. **Clone the repository**:
   ```
   git clone https://github.com/cp-coder1269/user-management-microservices.git
   ```

2. **Install dependencies**:
   ```
   cd user-management-microservices
   npm install
   ```

### Running the Project
To start all three services together using the concurrency module of Node.js, run the following command in the root directory of the project:

```bash
npm run start:dev
```

This command will concurrently start the `api-gateway`, `user-management`, and `block-user` services.




For any issues or further assistance, email `cppal474@gmail.com`.
