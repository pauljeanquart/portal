pipeline {
    agent any

    stages {
         stage ("Check changes") {
            steps {
                echo "Check if there are any changes pushed into this branch..."

                script {
                    changeCount = currentBuild.changeSets.size()
                }

                echo "${changeCount} commit(s) since last buid."
            }
        }
        stage('Build') {
            when {
                 expression {
                     changeCount > 0
                     }
                  }
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
            when {
                 expression {
                     changeCount > 0
                     }
                  }
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            when {
                 expression {
                     changeCount > 0
                     }
                  }
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