pipeline {
  agent any

  tools {nodejs "nodejs23"}

  stages {

    stage('Running Test Scenario') {
      steps {
        bat "apifox config set base_url=%base_url%"
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174926 -e 37208381 -n 1 -r html,cli --database-connection ./database-connections.json'
      }
    }
  }
}
