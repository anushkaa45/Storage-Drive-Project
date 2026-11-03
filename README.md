# DriveSphere 🚀

### Your Files. Your Space. Anywhere.

DriveSphere is a cloud storage and file management application developed using **Spring Boot Microservices** and **React**. It provides a centralized platform to organize files and folders, upload and download files, and manage stored data through a clean web interface.

The project is designed with a modular microservices architecture, making it easier to maintain, extend, and scale in the future.

## ✨ Key Features

- Create and organize folders
- Upload and download files
- Delete files and folders
- Browse files and folders
- Grid and list views
- File type identification
- Centralized file storage
- Responsive React-based interface
- Independent backend microservices
- Service discovery and monitoring

## 🏗️ System Architecture

DriveSphere uses a microservices-based architecture consisting of four independent Spring Boot services and a React frontend.

```text
                  React Frontend
                    Port 5173
                       |
                       v
                  Drive Service
                    Port 8091
                       |
             +---------+----------+
             |                    |
             v                    v
       Storage Service      Service Registry
          Port 8092            Port 8761
                                  |
                                  v
                             Admin Server
                               Port 1111
```

### Backend Services

| Service          | Port | Responsibility                 |
| ---------------- | ---: | ------------------------------ |
| Service Registry | 8761 | Service discovery using Eureka |
| Admin Server     | 1111 | Monitoring registered services |
| Drive Service    | 8091 | File and folder management     |
| Storage Service  | 8092 | File storage and retrieval     |

## 🛠️ Technology Stack

**Backend**

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Cloud Netflix Eureka
- Spring Boot Admin
- H2 Database
- Maven

**Frontend**

- React
- Vite
- JavaScript
- CSS

**Development Tools**

- Visual Studio Code
- Git and GitHub
- Maven
- npm

## 📁 Project Structure

```text
DriveSphere/
│
├── Admin-Server/
│
├── Drive-Service/
│
├── Service-Registry/
│
├── Storage-Service/
│
├── drive-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── Screenshots/
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Java JDK
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/anushkaa45/Storage-Drive-Project.git
cd Storage-Drive-Project
```

### 2. Start Backend Services

Start the services in the following order. Run each service in a separate terminal.

**Step 1 – Service Registry**

```powershell
cd Service-Registry
.\mvnw.cmd spring-boot:run
```

**Step 2 – Admin Server**

```powershell
cd Admin-Server
.\mvnw.cmd spring-boot:run
```

**Step 3 – Storage Service**

```powershell
cd Storage-Service
.\mvnw.cmd spring-boot:run
```

**Step 4 – Drive Service**

```powershell
cd Drive-Service
.\mvnw.cmd spring-boot:run
```

### 3. Start Frontend

Open another terminal:

```bash
cd drive-frontend
npm install
npm run dev
```

Open the application in your browser:

[http://localhost:5173](http://localhost:5173)

## 🔗 Application URLs

| Component        | Local URL                                      |
| ---------------- | ---------------------------------------------- |
| React Frontend   | [http://localhost:5173](http://localhost:5173) |
| Drive Service    | [http://localhost:8091](http://localhost:8091) |
| Storage Service  | [http://localhost:8092](http://localhost:8092) |
| Eureka Dashboard | [http://localhost:8761](http://localhost:8761) |
| Admin Server     | [http://localhost:1111](http://localhost:1111) |

## 💾 Data Storage

- H2 file-based database is used by the Drive Service.
- The Storage Service manages uploaded file storage on the local filesystem.
- Runtime data and generated files are excluded from Git using `.gitignore`.

**Note:** This project currently uses a local development setup. Cloud deployment and production-grade storage can be added in future versions.

## 🚀 Future Enhancements

- User registration and authentication
- Secure file sharing
- Cloud-based file storage
- User-specific storage management
- Search and advanced filtering
- File preview functionality
- Deployment to a cloud platform

## 👩‍💻 Developer

**Anushka Khade**

Engineering Student | Artificial Intelligence and Data Science

GitHub: [@anushkaa45](https://github.com/anushkaa45)

---

⭐ If you find DriveSphere interesting, consider giving the repository a star!

*DriveSphere – Store. Organize. Access. Anywhere.*
