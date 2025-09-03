pipeline {
  agent any
  
  environment {
    base_url = 'http://127.0.0.1:59999'
  }
  
  tools {nodejs "nodejs23"}

  stages {
    stage('Running Test Scenario') {
      steps {
        bat "apifox config set base_url=%base_url%"
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174486 -e 37208381 -n 1 -r html,cli'
      }
    }
  }
}
