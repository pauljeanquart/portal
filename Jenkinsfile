pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                cleanWs()
                git branch: "develop",
                    url: "http://prod.local/gitea/PiLab/Portal.git"
                echo 'develop..'
                sh 'hugo --destination /mnt/data/webapps/portal'
                sh 'chmod -R 0777 /mnt/data/webapps/portal'
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
                echo 'main..'
                sh 'hugo --destination /mnt/data/webapps/portal'
                sh 'chmod -R 0777 /mnt/data/webapps/portal'
            }
        }
    }
}