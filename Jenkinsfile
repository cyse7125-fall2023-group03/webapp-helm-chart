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
                        sh "DEBUG=semantic-release:* npx semantic-release -e /var/lib/jenkins/workspace/helm/release.config.js"
                    }
                }
            }
        }

        stage('Update Chart Version') {
            steps {
                script {
                    def branchName = "origin/main" // Replace with the desired branch name
                    def newVersion = sh(script: "BRANCH=${branchName} semantic-release get version", returnStdout: true).trim()
                    // Update Chart.yaml with the new version
                    sh "sed -i 's/version:.*\$/version: \${newVersion}/' /var/lib/jenkins/workspace/helm/Chart.yaml"
                }
            }
        }

        stage('Semantic Release') {
            steps {
                // Install nvm
                // sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash'

                // // Activate nvm
                // sh 'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"'

                // // Install Node.js and npm
                // sh 'nvm install 16.10.0'  // or any version you need
                // sh 'nvm use 16.10.0'
                // sh 'sudo apt update -y'
                // sh 'sudo apt install nodejs -y'
                // sh 'node -v'
                // sh 'curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh'
                sh 'npm install semantic-release'
                sh 'npx semantic-release'
            }
        }

        // stage('Update Version in Chart.yaml') {
        //     steps {
        //         script {
        //             def newVersion = sh(script: 'npx -q semantic-release-cli get version', returnStdout: true).trim()
        //             sh "sed -i 's/version:.*\$/version: \${newVersion}/' ./Chart.yaml"
        //         }
        //     }
        // }

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
