pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                cleanWs()
                git branch: "main",
                    url: "http://prod.local/gitea/PiLab/Portal.git"
                echo 'Deploying..'
                sh 'hugo --destination /mnt/data/webapps/Portal'
            }
        }
    }
}