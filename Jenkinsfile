pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'npm install'
      }
    }
    stage('set-up') {
      steps {
        sh 'sudo cp /var/lib/jenkins/workspace/test_config/* ./config'
        sh 'sudo redis-server /etc/redis/redis.conf'
      }
    }
    stage('test') {
      steps {
        sh 'npm test'
      }
    }
//     stage('deploy') {
//       steps{
//         sh 'cd ~/coffit'
//         sh 'npm install'
//         sh 'pm2 startOrReload ecosystem_json --env production'
//       }
//     }
  }
}