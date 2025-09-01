pipeline {
    agent any
    tools{
        jdk 'JDK-21'
        maven 'Maven'
        nodejs 'nodejs'
    }/*
    stages {
        stage('部署数据库') {
            steps {
                withKubeConfig([credentialsId: 'k8s1']) {
                    bat 'minikube update-context'
                    bat 'kubectl apply -f mysqlpv.yaml'
                    bat 'kubectl apply -f init.yaml'
                    bat 'kubectl apply -f mysql-deployment.yaml'
                    bat 'kubectl apply -f mysql-service.yaml'
                }
            }
        }*/
        stage('构建后端，导入minikube') {
            steps {
                withKubeConfig([credentialsId: 'k8s1']) {
                bat '''
                cd ./backend
                mvn clean package
                docker build -t market-back:v1 .
                '''
                bat 'minikube image load market-back:v1'
                }
            }
        }
        stage('部署后端') {
            steps {
                withKubeConfig([credentialsId: 'k8s1']) {
                    bat 'kubectl apply -f backend-deployment.yaml'
                    bat 'kubectl apply -f backend-service.yaml'
                }
            }
        }
        stage('构建前端，导入minikube') {
            steps {
                withKubeConfig([credentialsId: 'k8s1']) {
                bat '''
                cd ./frontend/src
                npm run build
                docker build -t market-front:v1 .
                
                '''
                bat 'minikube image load market-front:v1'
                }
            }
        }
        stage('部署前端') {
            steps {
                withKubeConfig([credentialsId: 'k8s1']) {
                    bat 'kubectl apply -f frontend-deployment.yaml'
                    bat 'kubectl apply -f frontend-service.yaml'
                }
            }
        }
        
    }
    post {
        always {
            echo "Kubernetes自动部署完成"
        }
    }
}
