pipeline {
  agent any

  tools {nodejs "nodejs23"}

  stages {
    stage('1.1用户的注册与登录') {
      steps {
        bat "apifox config set base_url=%base_url%"
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174486 -e 37208381 -n 1 -r html,cli'
      }
    }

    stage('用户的基础信息修改与重新登录') {
      steps {
        bat "apifox config set base_url=%base_url%"
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174802 -e 37208381 -n 1 -r html,cli'
      }
    }    
    
    stage('1.3个人简介的修改与获取') {
      steps {
        bat "apifox config set base_url=%base_url%"
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174806 -e 37208381 -n 1 -r html,cli'
      }
    }

    stage('1.4用户的上传头像与获取头像') {
      steps {
        bat "apifox config set base_url=%base_url%"
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174798 -e 37208381 -n 1 -r html,cli'
      }
    }

    stage('1.5用户的关注测试') {
      steps {
        bat "apifox config set base_url=%base_url%"
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174852 -e 37208381 -n 1 -r html,cli'
      }
    }
    
    stage('2.1商品的添加、修改、获取、删除与分页获取') {
      steps {
        bat "apifox config set base_url=%base_url%"
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174926 -e 37208381 -n 1 -r html,cli --database-connection ./database-connections.json'
      }
    }

    stage('2.2商品的收藏、获取收藏与取消收藏') {
      steps {
        bat "apifox config set base_url=%base_url%"
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7175109 -e 37208381 -n 1 -r html,cli'
      }
    }

    stage('2.3商品图的上传、获取、信息获取、删除与修改') {
      steps {
        bat "apifox config set base_url=%base_url%"
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7175157 -e 37208381 -n 1 -r html,cli --database-connection ./database-connections.json'
      }
    }

    stage('3.1订单的创建、修改、获取与支付方式添加') {
      steps {
        bat "apifox config set base_url=%base_url%"
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7180110 -e 37208381 -n 1 -r html,cli --database-connection ./database-connections.json'
      }
    }

    stage('4.1会话与消息的创建与获取') {
      steps {
        bat "apifox config set base_url=%base_url%"
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7179626 -e 37208381 -n 1 -r html,cli --database-connection ./database-connections.json'
      }
    }
  }
}
