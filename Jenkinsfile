pipeline {
    agent any

    stages {
        stage('Build') {
            when { expression { env.BRANCH_NAME == 'develop' } }
            steps {
                cleanWs()
                git branch: "develop",
                    url: "http://prod.local/gitea/PiLab/Portal.git"
                sh 'hugo --destination /mnt/dev/webapps/portal'
                sh 'chmod -R 0777 /mnt/dev/webapps/portal'
            }
        }
        stage('Test') {
            when { expression { env.BRANCH_NAME ==~ 'release*' } }
            steps {
                cleanWs()
                git branch: env.BRANCH_NAME,
                    url: "http://prod.local/gitea/PiLab/Portal.git"
                sh 'hugo --destination /mnt/qa/webapps/portal'
                sh 'chmod -R 0777 /mnt/qa/webapps/portal'
            }
        }
        stage('Deploy') {
            when { expression { env.BRANCH_NAME == 'main' } }
            steps {
                cleanWs()
                git branch: "main",
                    url: "http://prod.local/gitea/PiLab/Portal.git"
                sh 'hugo --destination /mnt/data/webapps/portal'
                sh 'chmod -R 0777 /mnt/data/webapps/portal'
            }
        }
    }
}
