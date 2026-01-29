pipeline {
    agent any
    
    tools {
        maven 'Maven3'
        jdk 'JDK11'
    }
    
    environment {
        SONAR_HOST_URL = 'http://localhost:9000'
        SONAR_PROJECT_KEY = 'devops-portfolio'
        DOCKER_IMAGE = 'devops-portfolio'
        DOCKER_TAG = "${BUILD_NUMBER}"
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_CREDENTIALS = 'dockerhub-credentials'
        APP_PORT = '8080'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from Git repository...'
                checkout scm
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
            when {
                // Only run this stage if test files exist
                expression {
                    return fileExists('src/test/java') || fileExists('src/test')
                }
            }
            steps {
                echo '🧪 Running unit tests...'
                sh 'mvn test'
            }
            post {
                always {
                    // Use allowEmptyResults to prevent failures when no tests exist
                    junit allowEmptyResults: true, 
                          testResults: '**/target/surefire-reports/*.xml',
                          skipPublishingChecks: true
                }
                success {
                    echo '✅ All tests passed!'
                }
                failure {
                    echo '❌ Some tests failed!'
                }
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                echo '🔍 Running SonarQube code analysis...'
                script {
                    withSonarQubeEnv('SonarQube') {
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
                    sleep 10
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
        }
        failure {
            echo '💥 Pipeline failed!'
        }
    }
}
