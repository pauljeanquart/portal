pipeline {
    agent any

    stages {
        stage('Build') {
            when {
                branch 'develop'
            }  
            steps {
                cleanWs()
                git branch: "develop",
                    url: "http://prod.local/gitea/PiLab/Portal.git"
                sh 'hugo --baseURL http://dev.local/portal/ --destination /mnt/dev/webapps/portal'
                sh 'chmod -R 0777 /mnt/dev/webapps/portal'
            }
        }
        stage('Test') {
             when {
                branch 'release*'
            }  
            steps {
                cleanWs()
                git branch: env.BRANCH_NAME,
                    url: "http://prod.local/gitea/PiLab/Portal.git"
                sh 'hugo --baseURL http://qa.local/portal/ --destination /mnt/qa/webapps/portal'
                sh 'chmod -R 0777 /mnt/qa/webapps/portal'
            }
        }
        stage('Deploy') {
            when { expression { env.BRANCH_NAME == 'main' } }
            steps {
                cleanWs()
                git branch: "main",
                    url: "http://prod.local/gitea/PiLab/Portal.git"
                sh 'hugo --baseURL http://prod.local/portal/ --destination /mnt/data/webapps/portal'
                sh 'chmod -R 0777 /mnt/data/webapps/portal'
            }
        }
    }
}

