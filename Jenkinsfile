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
    stage('deploy') {
      steps{
        sh 'ssh -i /var/lib/jenkins/workspace/sshkey/coffit.pem ubuntu@3.130.16.63 ./deploy.sh'
        sh 'ssh -i /var/lib/jenkins/workspace/sshkey/coffit.pem ubuntu@3.13.92.88 ./deploy.sh'
      }
    }
  }
}