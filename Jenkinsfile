pipeline {
    agent any
    tools{nodejs 'node'}

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
                               env.GIT_LOCAL_BRANCH='main'
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
                        version_id = sh(returnStdout: true, script: "git describe --tags --abbrev=0 --tags | tr -d 'v' ").trim()
                        echo "${version_id}"
                        // sh "rm -f *.tgz & helm package --version ${nextRelease.version} /var/lib/jenkins/workspace/helm"
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
