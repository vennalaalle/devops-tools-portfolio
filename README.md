# 🚀 DevOps Portfolio - CI/CD Pipeline

A comprehensive DevOps portfolio showcasing a complete CI/CD pipeline using industry-standard tools: **Git**, **Jenkins**, **SonarQube**, **Docker**, **Maven**, and **Spring Boot**.

![Pipeline Status](https://img.shields.io/badge/build-passing-brightgreen)
![Code Quality](https://img.shields.io/badge/code%20quality-A+-brightgreen)
![Docker](https://img.shields.io/badge/docker-enabled-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📋 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Pipeline Stages](#pipeline-stages)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This project demonstrates a production-ready CI/CD pipeline that automatically builds, tests, analyzes code quality, containerizes, and deploys a Spring Boot application. The pipeline is triggered on every Git commit and provides comprehensive feedback on code quality and build status.

### What This Project Does:
- ✅ Automated build and deployment on Git push
- ✅ Unit testing with coverage reports
- ✅ Code quality analysis with SonarQube
- ✅ Containerization with Docker
- ✅ Automated deployment to container environment
- ✅ Health monitoring and status checks
- ✅ Beautiful portfolio webpage showcasing the stack

---

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│     Git     │─────▶│   Jenkins    │─────▶│  SonarQube  │
│ (Source)    │      │ (CI/CD)      │      │ (Quality)   │
└─────────────┘      └──────┬───────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │    Maven     │
                     │   (Build)    │
                     └──────┬───────┘
                            │
                            ▼
                     ┌──────────────┐      ┌─────────────┐
                     │    Docker    │─────▶│   Deploy    │
                     │  (Container) │      │ (Runtime)   │
                     └──────────────┘      └─────────────┘
```

---

## 🛠️ Technologies Used

| Technology | Purpose | Status |
|------------|---------|--------|
| **Git** | Version Control System | ✅ Configured |
| **Jenkins** | Automation & CI/CD Server | ✅ Configured |
| **Maven** | Build & Dependency Management | ✅ Configured |
| **SonarQube** | Code Quality & Security | ✅ Configured |
| **Docker** | Containerization Platform | ✅ Configured |
| **Spring Boot** | Application Framework | ✅ Ready |
| **JUnit** | Unit Testing | ✅ Ready |
| **JaCoCo** | Code Coverage | ✅ Ready |

---

## ✨ Features

### 🔄 CI/CD Pipeline
- Automated build on Git push
- Multi-stage pipeline with parallel execution
- Automatic rollback on failure
- Build artifact versioning

### 🧪 Testing & Quality
- Automated unit testing
- Code coverage reports (JaCoCo)
- Static code analysis (SonarQube)
- Quality gate enforcement
- Security vulnerability scanning

### 🐳 Containerization
- Multi-stage Docker builds for optimized images
- Automated container deployment
- Health check monitoring
- Container orchestration ready

### 📊 Monitoring & Reporting
- Real-time build status
- SonarQube quality dashboards
- Test result visualization
- Build history tracking

---

## 📦 Prerequisites

Ensure you have the following installed:

```bash
# Required Software
- Java 11 or higher
- Maven 3.6+
- Docker 20.10+
- Git 2.30+
- Jenkins 2.375+
- SonarQube 9.0+

# System Requirements
- RAM: 4GB minimum (8GB recommended)
- Disk: 10GB free space
- OS: Linux (Ubuntu 20.04+), macOS, or Windows with WSL2
```

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/devops-portfolio.git
cd devops-portfolio
```

### 2. Build Locally
```bash
# Build with Maven
mvn clean package

# Run tests
mvn test

# Run locally
java -jar target/portfolio-app-1.0.0.jar
```

### 3. Build Docker Image
```bash
# Build image
docker build -t devops-portfolio:latest .

# Run container
docker run -d -p 8080:8080 devops-portfolio:latest
```

### 4. Access Application
```bash
# Application
http://localhost:8080

# Health Check
http://localhost:8080/health

# Portfolio Webpage
Open index.html in your browser
```

For complete setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

## 📁 Project Structure

```
devops-portfolio/
├── src/
│   ├── main/
│   │   ├── java/com/devops/portfolio/
│   │   │   └── PortfolioApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/com/devops/portfolio/
│           └── PortfolioApplicationTests.java
├── Dockerfile
├── Jenkinsfile
├── pom.xml
├── index.html              # Portfolio webpage
├── style.css               # Styling
├── script.js               # Interactive features
├── SETUP_GUIDE.md         # Complete setup instructions
└── README.md              # This file
```

---

## 🔄 Pipeline Stages

The Jenkins pipeline consists of the following stages:

1. **📥 Checkout**
   - Pull latest code from Git repository
   - Verify branch and commit

2. **🔨 Build**
   - Compile source code with Maven
   - Package application as JAR

3. **🧪 Unit Tests**
   - Execute JUnit tests
   - Generate test reports
   - Publish results

4. **🔍 SonarQube Analysis**
   - Scan code for bugs and vulnerabilities
   - Calculate code coverage
   - Check code smells

5. **🚦 Quality Gate**
   - Enforce quality standards
   - Block build if quality gate fails

6. **🐳 Build Docker Image**
   - Create optimized container image
   - Tag with build number

7. **📤 Push to Registry**
   - Upload image to Docker Hub
   - Tag as latest

8. **🧹 Clean Old Containers**
   - Remove previous deployments
   - Free up resources

9. **🚀 Deploy**
   - Run new container
   - Expose on port 8080

10. **💓 Health Check**
    - Verify application is running
    - Check API endpoints

---

## ⚙️ Configuration

### Jenkins Configuration
```groovy
// Update in Jenkinsfile
environment {
    SONAR_HOST_URL = 'http://your-sonarqube-url:9000'
    DOCKER_REGISTRY = 'docker.io'
    DOCKER_CREDENTIALS = 'dockerhub-credentials'
    APP_PORT = '8080'
}
```

### SonarQube Configuration
```xml
<!-- Update in pom.xml -->
<properties>
    <sonar.projectKey>your-project-key</sonar.projectKey>
    <sonar.projectName>Your Project Name</sonar.projectName>
</properties>
```

### Application Configuration
```properties
# Update in src/main/resources/application.properties
server.port=8080
spring.application.name=devops-portfolio
```

---

## 💻 Usage

### Running the Pipeline

#### Automatic Trigger (Webhook)
```bash
# Push code to trigger pipeline
git add .
git commit -m "Your commit message"
git push origin main
```

#### Manual Trigger
```bash
# In Jenkins UI
1. Navigate to your pipeline job
2. Click "Build Now"
3. Monitor the build progress
```

### Viewing Results

#### Jenkins Build
```
Jenkins Dashboard → Your Pipeline → Build #X
- View console output
- Check stage results
- Download artifacts
```

#### SonarQube Analysis
```
SonarQube → Projects → devops-portfolio
- View code quality metrics
- Check security vulnerabilities
- Review code coverage
```

#### Docker Container
```bash
# List running containers
docker ps

# View container logs
docker logs <container-id>

# Access container shell
docker exec -it <container-id> /bin/bash
```

---

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Home - Application info |
| `/health` | GET | Health check endpoint |
| `/api/pipeline` | GET | Pipeline information |
| `/api/tools` | GET | Tools and technologies |

### Example Responses

```bash
# Home endpoint
curl http://localhost:8080/
{
  "application": "DevOps Portfolio",
  "status": "running",
  "message": "Welcome to DevOps CI/CD Pipeline Demo",
  "timestamp": "2026-01-29T10:30:00",
  "technologies": ["Git", "Jenkins", "SonarQube", "Docker", "Maven"]
}

# Health endpoint
curl http://localhost:8080/health
{
  "status": "UP",
  "application": "DevOps Portfolio",
  "timestamp": "2026-01-29T10:30:00"
}
```

---

## 🐛 Troubleshooting

### Common Issues

**Build Fails**
```bash
# Check Java version
java -version

# Clear Maven cache
rm -rf ~/.m2/repository

# Rebuild
mvn clean install
```

**Docker Permission Denied**
```bash
# Add user to docker group
sudo usermod -aG docker $USER
sudo systemctl restart jenkins
```

**Port Already in Use**
```bash
# Find process using port
sudo lsof -i :8080

# Kill process
sudo kill -9 <PID>
```

For more troubleshooting, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Contact

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Jenkins Community for excellent CI/CD tools
- SonarSource for code quality platform
- Docker for containerization technology
- Spring Boot team for the framework
- Open source community

---

## 📈 Project Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Tests](https://img.shields.io/badge/tests-100%25-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-green)
![Quality Gate](https://img.shields.io/badge/quality%20gate-passed-brightgreen)

---

**⭐ Star this repository if you find it helpful!**
