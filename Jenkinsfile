pipeline {
    agent any

    stages {
        stage('Build') {
            when { expression { env.BRANCH_NAME == 'develop' } }
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
            when { expression { env.BRANCH_NAME ==~ 'release-/.*' } }
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            when { expression { env.BRANCH_NAME == 'main' } }
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