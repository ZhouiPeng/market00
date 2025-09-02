pipeline {
  agent any

  tools {nodejs "nodejs23"}

  stages {
    stage('Install Apifox CLI') {
      steps {
        sh 'npm install -g apifox-cli'
      }
    }

    stage('Running Test Scenario') {
      steps {
        sh 'apifox run --access-token $APIFOX_ACCESS_TOKEN -t 7174486 -e 37208381 -n 1 -r html,cli'
      }
    }
  }
}
