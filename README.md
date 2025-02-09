# 🚀 KYC Backend

This is a **TypeScript-based Express.js backend** that uses **Sequelize** for MySQL database operations. It supports **authentication, customer management, and file uploads**.

## 📌 Features
-  Express.js with TypeScript
-  MySQL Database using Sequelize ORM
-  Authentication with JWT
-  RESTful API for managing customers
-  File upload to AWS S3
-  Middleware for authentication & error handling
-  Environment variable support with `.env`

---

## 📦 Installation

1️⃣ **Clone the repository**

2️⃣ **Install dependencies**
```sh
npm install
```

3️⃣ **Configure environment variables**  
Create a `.env` file in the project root and add:
```sh
DATABASE_URL=mysql://root:password@localhost:3306/customerdb
PORT=5000
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_bucket_name
AWS_REGION=us-east-1
```

---

## 🚀 Run the Project

**Start the development server**
```sh
npm run dev
```

**Build & Run in production**
```sh
npm run build
npm start
```

---

## 🛠 API Endpoints

### 🔑 **Authentication**
| Method | Endpoint         | Description           | Auth Required |
|--------|-----------------|----------------------|--------------|
| POST   | `/api/auth/login`  | Login & get JWT     | ❌ No |

### 👤 **Customer Management**
| Method | Endpoint          | Description              | Auth Required |
|--------|------------------|-------------------------|--------------|
| GET    | `/api/customer`  | Fetch customers         |  Yes |
| POST   | `/api/customer`  | Add a new customer      | ❌ No |
| PATCH  | `/api/customer/:id` | Update customer status |  Yes |

### 📤 **File Upload**
| Method | Endpoint    | Description              | Auth Required |
|--------|------------|-------------------------|--------------|
| POST   | `/api/upload` | Upload file to AWS S3  |  Yes |

---

## 🛠 Database Migration
**Run Sequelize migrations**
```sh
npx sequelize-cli db:migrate
```

**Create a new migration**
```sh
npx sequelize-cli migration:generate --name add-customers
```

---

##  Best Practices Followed
- **Environment Variables**: Stored securely in `.env`
- **MVC Architecture**: Separates controllers, models, and routes
- **Error Handling**: Centralized middleware for handling errors
- **Authentication**: Uses JWT for secure API access
- **Sequelize ORM**: Interacts with MySQL efficiently

---

## 🚀 Deployment Guide

### **Deploy to AWS EC2**
1. **Build the project**
   ```sh
   npm run build
   ```
2. **Start the server**
   ```sh
   npm start
   ```

### **Deploy to Docker**
1. **Create a `Dockerfile`**
   ```
   FROM node:18
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   CMD ["npm", "start"]
   ```
2. **Build & Run Docker Container**
   ```sh
   docker build -t express-backend .
   docker run -p 5000:5000 express-backend
   ```

---

## 💡 Future Improvements
- [ ] Add Role-Based Access Control (RBAC)
- [ ] Implement WebSockets for real-time updates
- [ ] Add unit tests with Jest

---

## 🤝 Contributing
Pull requests are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to GitHub (`git push origin feature-name`)
5. Open a Pull Request 🚀

---

## 📄 License
This project is licensed under the MIT License.

---

🚀 **Happy Coding!** 🚀

