pipeline {
  agent any
  
  environment {
    base_url = credentials('https://backend:80')
  }
  
  tools {nodejs "nodejs23"}

  stages {
    stage('Running Test Scenario') {
      steps {
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174486 -e 37208381 -n 1 -r html,cli'
      }
    }
  }
}
