pipeline {
    agent any

    environment {
        SEMANTIC_RELEASE_VERSION = '17.2.3'  // Specify the desired Semantic Release version
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }
    stages {
        stage('Checkout Repository') {
            steps {
                git branch: 'main', 
                    credentialsId: 'helm-gh',
                    url: 'https://github.com/cyse7125-fall2023-group03/webapp-helm-chart.git'
            }
        }
        
        
        
        stage('Install and Run Semantic Release') {
        // agent {'node'}
            steps {
                withCredentials([string(credentialsId: 'helm-ghnew', variable: 'GITHUB_TOKEN')]) {
                    script {
                        // Install Semantic Release
                        sh "npm install semantic-release@${env.SEMANTIC_RELEASE_VERSION}"
                        // Run Semantic Release
                        sh "DEBUG=semantic-release:* npx semantic-release -e /var/lib/jenkins/workspace/helm/.releaserc.json"
                    }
                }
            }
        }

        stage('Update Chart Version') {
            steps {
                script {
                    // def branchName = "main" // Replace with the desired branch name
                    def newVersion = sh(script: "semantic-release get version", returnStdout: true).trim()
                    // Update Chart.yaml with the new version
                    sh "sed -i 's/version:.*\$/version: \${newVersion}/' /var/lib/jenkins/workspace/helm/Chart.yaml"
                }
            }
        }

        // stage('Package Chart') {
        //     steps {
        //         // Create a zip file with the chart
        //         sh 'cd .. && tar -czf my-chart-${newVersion}.tgz webapp-helm-chart'
        //     }
        // }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
    }
}
