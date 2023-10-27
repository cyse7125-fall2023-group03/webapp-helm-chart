pipeline {
    agent any

    environment {
        SEMANTIC_RELEASE_VERSION = '17.2.3'  // Specify the desired Semantic Release version
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
        GITHUB_TOKEN = credentials('helm-gh')
    }
    stages {
        stage('Checkout Repository') {
            steps {
                git branch: 'main', 
                    credentialsId: 'helm-gh',
                    url: 'https://github.com/cyse7125-fall2023-group03/webapp-helm-chart.git'
            }
        }

        stage('Update Chart Version') {
            steps {
                script {
                    def new_version = sh(returnStdout: true, script: "git describe --tags --abbrev=0").trim()
                    sh "awk -v new_version='${new_version}' '/version:/ {\$2 = new_version} 1' Chart.yaml > tmp && mv tmp Chart.yaml"
                }
            }
        }

        stage('Package Chart') {
            steps {
                script {
                    // Create a zip file with the chart
                    def new_version = sh(returnStdout: true, script: "git describe --tags --abbrev=0").trim()
                    sh "tar -czf \"/var/lib/jenkins/workspace/helm-chart-${new_version}.tgz\" /var/lib/jenkins/workspace/helm"
                }
            }
        }
        
        stage('Create GitHub Release') {
            steps {
                script {
                    // Define GitHub release information
                    // def githubToken = credentials('helm-gh') // Replace with your actual GitHub token ID
                    def tagName = sh(returnStdout: true, script: "git describe --tags --abbrev=0").trim()

                    // Create the GitHub release
                    sh """
                        github-release upload \
                            --user uday-kiran-k \
                            --repo https://github.com/cyse7125-fall2023-group03/webapp-helm-chart.git \
                            --tag ${tagName} \
                            --name "helm-chart-${tagName}" \
                            --file /var/lib/jenkins/workspace/helm-chart-${tagName}.tgz
                            --token ${env.GITHUB_TOKEN}
                    """.stripIndent()
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