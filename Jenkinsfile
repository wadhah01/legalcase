pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'your-registry'  // Replace with your registry
        IMAGE_NAME = 'legal-case-management'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Frontend Tests') {
                    steps {
                        dir('frontend') {
                            sh 'npm run test'
                        }
                    }
                }
                stage('Backend Tests') {
                    steps {
                        dir('backend') {
                            sh 'mvn test'
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    docker.build("${DOCKER_REGISTRY}/frontend:${IMAGE_TAG}", "-f Dockerfile.frontend .")
                    docker.build("${DOCKER_REGISTRY}/backend:${IMAGE_TAG}", "-f Dockerfile.backend .")
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-credentials') {
                        docker.image("${DOCKER_REGISTRY}/frontend:${IMAGE_TAG}").push()
                        docker.image("${DOCKER_REGISTRY}/backend:${IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy to Development') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    sh """
                        export IMAGE_TAG=${IMAGE_TAG}
                        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
                    """
                }
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh """
                        export IMAGE_TAG=${IMAGE_TAG}
                        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            slackSend(
                color: 'good',
                message: "Build #${BUILD_NUMBER} - Success! Branch: ${BRANCH_NAME}"
            )
        }
        failure {
            slackSend(
                color: 'danger',
                message: "Build #${BUILD_NUMBER} - Failed! Branch: ${BRANCH_NAME}"
            )
        }
    }
}