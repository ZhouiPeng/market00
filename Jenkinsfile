pipeline {
    agent any
    tools{
        jdk 'JDK-21'
        maven 'Maven'
        nodejs 'nodejs23'
    }
    stages {
        stage('清除deployment,service') {
            steps {
                withKubeConfig([credentialsId: 'k8s1']) {
                    bat 'kubectl delete deployment backend --ignore-not-found'
                    bat 'kubectl delete deployment frontend --ignore-not-found'
                    bat 'kubectl delete service backend --ignore-not-found'
                    bat 'kubectl delete service frontend --ignore-not-found'
                }
            }
        }
         stage('清除镜像') {
            steps {
                withKubeConfig([credentialsId: 'k8s1']) {
                    script {
                    try {
                        bat 'minikube image rm market-back:v1'
                    } catch (Exception e) {
                        echo 'minikube无market-back:v1'
                    }
                    try {
                        bat 'minikube image rm market-front:v1'
                    } catch (Exception e) {
                        echo 'minikube无market-front:v1'
                    }
                    try {
                        bat 'docker image rm market-back:v1'
                    } catch (Exception e) {
                        echo 'docker无market-back:v1'
                    }
                    try {
                        bat 'docker image rm market-front:v1'
                    } catch (Exception e) {
                        echo 'docker无market-front:v1'
                    }
                    }
                }
            }
        }
        stage('部署数据库') {
            steps {
                withKubeConfig([credentialsId: 'k8s1']) {

                    bat 'minikube update-context'
                    bat 'minikube image load mysql:8.0.43'
                    bat 'kubectl apply -f mysqlpv.yaml'
                    bat 'kubectl apply -f init.yaml'
                    bat 'kubectl apply -f mysql-deployment.yaml'
                    bat 'kubectl apply -f mysql-service.yaml'
                }
            }
        }
        stage('构建后端，导入minikube') {
            steps {
                withKubeConfig([credentialsId: 'k8s1']) {
                bat '''
                cd ./backend
                mvn clean package
                '''
                bat '''
                cd ./backend
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
                cd ./frontend
                npm install
                
                '''
                bat '''
                cd ./frontend
                npm run build
                '''
                bat '''
                cd ./frontend
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
        stage('打开后端服务测试端口，打开数据库服务测试端口') {
            steps {
                withKubeConfig([credentialsId: 'k8s1']) {
                    bat 'kubectl port-forward svc/backend 59999:80'
                    bat 'kubectl port-forward svc/mysql 59995:3306'
                }
            }
        }
        stage('1.1测试用户的注册与登录') {
      steps {
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174486 -e 37208381 -n 1 -r html,cli'
      }
    }

    stage('测试用户的基础信息修改与重新登录') {
      steps {
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174802 -e 37208381 -n 1 -r html,cli'
      }
    }    
    
    stage('1.3测试个人简介的修改与获取') {
      steps {
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174806 -e 37208381 -n 1 -r html,cli'
      }
    }

    stage('1.4测试用户的上传头像与获取头像') {
      steps {
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174798 -e 37208381 -n 1 -r html,cli'
      }
    }

    stage('1.5用户的关注测试') {
      steps {
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174852 -e 37208381 -n 1 -r html,cli'
      }
    }
    
    stage('2.1测试商品的添加、修改、获取、删除与分页获取') {
      steps {
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174926 -e 37208381 -n 1 -r html,cli --database-connection ./database-connections.json'
      }
    }

    stage('2.2测试商品的收藏、获取收藏与取消收藏') {
      steps {
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7175109 -e 37208381 -n 1 -r html,cli'
      }
    }

    stage('2.3测试商品图的上传、获取、信息获取、删除与修改') {
      steps {
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7175157 -e 37208381 -n 1 -r html,cli --database-connection ./database-connections.json'
      }
    }

    stage('3.1测试订单的创建、修改、获取与支付方式添加') {
      steps {
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7180110 -e 37208381 -n 1 -r html,cli --database-connection ./database-connections.json'
      }
    }

    stage('4.1测试会话与消息的创建与获取') {
      steps {
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7179626 -e 37208381 -n 1 -r html,cli --database-connection ./database-connections.json'
      }
    }
    }
    post {
        always {
            echo "微服务流水线部署完成"
        }
    }
}
