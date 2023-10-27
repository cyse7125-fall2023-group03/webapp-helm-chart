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
                    sh "rm -rf /var/lib/jenkins/workspace/*.tgz"
                    sh "helm package --destination /var/lib/jenkins/workspace /var/lib/jenkins/workspace/helm"
                    // sh "tar -czf \"/var/lib/jenkins/workspace/helm-chart-${new_version}.tgz\" /var/lib/jenkins/workspace/helm"
                }
            }
        }
        
        stage('Upload Release Asset') {
            steps {
                script {
                    def githubToken = credentials('helm-gh') // Replace with your actual GitHub token ID
                    def tagName = sh(returnStdout: true, script: "git describe --tags --abbrev=0").trim()
                    def releaseId
        
                    // Get the release ID
                    def releaseInfo = sh(script: """curl -s -H "Authorization: Bearer ${githubToken}" \
                                                https://api.github.com/repos/cyse7125-fall2023-group03/webapp-helm-chart/releases/latest""", returnStdout: true).trim()
                    releaseId = new groovy.json.JsonSlurper().parseText(releaseInfo)?.id?.toString()
        
                    echo "Tag Name: ${tagName}" // Print the tag name
                    echo "Release Info: ${releaseInfo}" // Print the complete release information
                    echo "Release ID: ${releaseId}" // Print the release ID
        
                    // Upload the release asset
                    sh """
                        curl -H 'Authorization: token ${githubToken}' \
                        -H 'Accept: application/vnd.github.v3+json' \
                        -X POST https://uploads.github.com/repos/cyse7125-fall2023-group03/webapp-helm-chart/releases/${releaseId}/assets?name=webapp-helmcharts-${tagName}.tgz \
                        --header 'Content-Type: application/gzip' \
                        --upload-file /var/lib/jenkins/workspace/webapp-helmcharts-${tagName}.tgz
                    """
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
