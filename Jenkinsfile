pipeline {
  agent any

  tools {nodejs "nodejs23"}

  stages {
    stage('Running Test Scenario') {
      steps {
        // 使用 Windows 环境变量语法 %VARIABLE_NAME%
        bat 'apifox run --access-token %APIFOX_ACCESS_TOKEN% -t 7174486 -e 37208381 -n 1 -r html,cli'
      }
    }
  }
}
