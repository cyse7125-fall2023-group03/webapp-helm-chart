pipeline {
    agent any

    environment {
        // SEMANTIC_RELEASE_VERSION = '17.2.3'  // Specify the desired Semantic Release version
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
        // GITHUB_TOKEN = credentials('sec-helm-gh')
    }
    stages {
        stage('Checkout Repository') {
            steps {
                git branch: 'main', 
                    credentialsId: 'helm-gh',
                    url: 'https://github.com/cyse7125-fall2023-group03/webapp-helm-chart.git'
            }
        }

        stage('release') {
            steps{
            script {
                withCredentials([string(credentialsId: 'jenkins-27', variable: 'GIT_TOKEN') ]) {
                        sh "git config user.name 'semantic-release-bot'"
                        sh "git config user.password ${GIT_TOKEN}"

                           withEnv(["GH_TOKEN=${GIT_TOKEN}"]) {  
                                sh "npx semantic-release"
                            }

                    }
                }
            }
        }

        stage('upload-release'){
            steps{
                script{
                    withCredentials([string(credentialsId: 'jenkins-27', variable: 'GIT_TOKEN')]) {

                    sh "git config user.name 'semantic-release-bot'"
                    sh "git config user.password ${GIT_TOKEN}"
                    version_id = sh(returnStdout: true, script: "git describe --tags --abbrev=0 --tags | tr -d 'v' ").trim(

                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
    }
}
