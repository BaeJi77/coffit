pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'npm install'
      }
    }
    stage('test') {
      steps {
        echo 'hihi'
        sh 'sudo cp /var/lib/jenkins/workspace/test_config/* ./config'
        sh 'npm test'
      }
    }
  }
}