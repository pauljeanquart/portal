pipeline {
    agent any

    stages {
        stage('Build') {
            when { branch: 'develop' }
            steps {
                cleanWs()
                git branch: "develop",
                    url: "http://prod.local/gitea/PiLab/Portal.git"
                echo 'develop..'
                sh 'hugo --destination /mnt/data/webapps/portal-dev'
                sh 'chmod -R 0777 /mnt/data/webapps/portal-dev'
            }
        }
        stage('Test') {
            when { branch: 'release-*' }
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            when { branch: 'main' }
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