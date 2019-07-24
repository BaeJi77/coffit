pipeline {
    agent any
    states {
        stage('build') {
            steps {
                sh 'npm install'
                sh 'node ./bin/www'
            }
        }
        stage('test') {
            steps {
                sh 'echo mocha ./tests'
            }
        }
    }
}