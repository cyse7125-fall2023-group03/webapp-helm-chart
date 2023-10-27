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

        stage('Update Chart Version') {
            steps {
                script {
                    def newVersion = sh(returnStdout: true, script: "git describe --tags --abbrev=0").trim()
                    sh "sed -i 's/version:.*\$/version: \${newVersion}/' /var/lib/jenkins/workspace/helm/Chart.yaml"
                }
            }
        }

        stage('Package Chart') {
            steps {
                script {
                // Create a zip file with the chart
                 def newVersion = sh(returnStdout: true, script: "git describe --tags --abbrev=0").trim()
                 sh 'cd .. && tar -czf my-chart-${newVersion}.tgz webapp-helm-chart'
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
