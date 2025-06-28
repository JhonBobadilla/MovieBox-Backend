pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Node.js') {
            steps {
                sh '''
                curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -
                apt-get install -y nodejs
                '''
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint (opcional)') {
            steps {
                // Solo si tienes eslint configurado
                // sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                // Solo si tienes tests
                // sh 'npm test'
            }
        }

        stage('Build Docker image') {
            steps {
                sh 'docker build -t moviebox-backend .'
            }
        }

        stage('Docker Compose up (opcional)') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        failure {
            mail to: 'correo@correo.com',
                 subject: "Pipeline Failed: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                 body: "Check Jenkins for details."
        }
    }
}
