pipeline {
    agent any
    
    tools {
        maven 'Maven1'  // Ensure this matches your Jenkins Maven configuration name
        jdk 'JDK17'     // Ensure this matches your Jenkins JDK configuration name
    }
    
    environment {
        // SonarQube configuration
        SONAR_HOST_URL = 'http://localhost:9000'  // Update with your SonarQube URL
        SONAR_PROJECT_KEY = 'devops-portfolio'
        
        // Docker configuration
        DOCKER_IMAGE = 'devops-portfolio'
        DOCKER_TAG = "${BUILD_NUMBER}"
        DOCKER_REGISTRY = 'docker.io'  // Update with your registry
        DOCKER_CREDENTIALS = 'dockerhub-credentials'  // Jenkins credentials ID
        
        // Application configuration
        APP_PORT = '8080'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from Git repository...'
                checkout scm
                
                // Alternative: specify repository explicitly
                // git branch: 'main', 
                //     credentialsId: 'git-credentials',
                //     url: 'https://github.com/your-username/your-repo.git'
            }
        }
        
        stage('Build') {
            steps {
                echo '🔨 Building the application with Maven...'
                sh '''
                    mvn clean compile
                    mvn package -DskipTests
                '''
            }
            post {
                success {
                    echo '✅ Build completed successfully!'
                }
                failure {
                    echo '❌ Build failed!'
                }
            }
        }
        
        stage('Unit Tests') {
            steps {
                echo '🧪 Running unit tests...'
                sh 'mvn test'
            }
            post{
                success{
                    script{
                        if (fileExists('target/surefire-reports')) {
                            junit 'target/surefire-reports/*.xml'
                        }else{
                            echo "⚠️ No test reports found, skipping JUnit publishing."
                        }
                    }
                }
            }
                    
        stage('SonarQube Analysis') {
            steps {
                echo '🔍 Running SonarQube code analysis...'
                script {
                    withSonarQubeEnv('SonarQube') {  // Must match your SonarQube server name in Jenkins
                        sh '''
                            mvn sonar:sonar \
                                -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                                -Dsonar.host.url=${SONAR_HOST_URL}
                        '''
                    }
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                echo '🚦 Waiting for SonarQube Quality Gate...'
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                script {
                    sh """
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }
        
        stage('Push to Docker Registry') {
            steps {
                echo '📤 Pushing Docker image to registry...'
                script {
                    withCredentials([usernamePassword(
                        credentialsId: "${DOCKER_CREDENTIALS}",
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh """
                            echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin ${DOCKER_REGISTRY}
                            docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                            docker push ${DOCKER_IMAGE}:latest
                            docker logout
                        """
                    }
                }
            }
        }
        
        stage('Clean Old Containers') {
            steps {
                echo '🧹 Cleaning up old containers...'
                script {
                    sh """
                        docker ps -a | grep ${DOCKER_IMAGE} | awk '{print \$1}' | xargs -r docker stop || true
                        docker ps -a | grep ${DOCKER_IMAGE} | awk '{print \$1}' | xargs -r docker rm || true
                    """
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo '🚀 Deploying application...'
                script {
                    sh """
                        docker run -d \
                            --name ${DOCKER_IMAGE}-${BUILD_NUMBER} \
                            -p ${APP_PORT}:${APP_PORT} \
                            ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
                echo "✅ Application deployed successfully on port ${APP_PORT}"
            }
        }
        
        stage('Health Check') {
            steps {
                echo '💓 Performing health check...'
                script {
                    sleep 10  // Wait for application to start
                    sh """
                        curl -f http://localhost:${APP_PORT}/health || exit 1
                    """
                }
            }
        }
    }
    
    post {
        always {
            echo '🧹 Cleaning workspace...'
            cleanWs()
        }
        success {
            echo '🎉 Pipeline completed successfully!'
            // Add notification here (email, Slack, etc.)
        }
        failure {
            echo '💥 Pipeline failed!'
            // Add notification here (email, Slack, etc.)
        }
    }
}
