pipeline {
    agent any

    stages {
        stage('Clone repo') {
            steps {
                echo 'clone'
                sh 'rm -fr testAppClone'
                sh 'git clone https://github.com/djaouedkh/theTipTop.git'
            }
        }
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
