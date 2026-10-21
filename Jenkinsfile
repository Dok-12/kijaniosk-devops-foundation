
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(
            numToKeepStr: '20',
            artifactNumToKeepStr: '10'
        ))
    }

    environment {
        NEXUS_URL = 'http://192.168.8.15:8081'
        NEXUS_REPOSITORY = 'week5-npm-releases'
        ARTIFACT = 'kijanikiosk-payments-1.0.0.tgz'
    }

    stages {
        stage('Lint') {
            steps {
                sh 'npm ci'
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    rm -rf dist
                    npm run build
                    test -f "dist/$ARTIFACT"
                '''
            }
        }

        stage('Parallel Verify') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm test'
                    }
                }

                stage('Package Verification') {
                    steps {
                        sh '''
                            test -s "dist/$ARTIFACT"
                            tar -tzf "dist/$ARTIFACT"
                            tar -xOzf "dist/$ARTIFACT" \
                                package/package.json
                        '''
                    }
                }
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts(
                    artifacts: 'dist/*.tgz',
                    fingerprint: true
                )
            }
        }

        stage('Publish') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'nexus-publisher',
                        usernameVariable: 'NEXUS_USER',
                        passwordVariable: 'NEXUS_PASSWORD'
                    )
                ]) {
                    sh '''
                        set +x
                        curl --fail --silent --show-error \
                            --user "$NEXUS_USER:$NEXUS_PASSWORD" \
                            --upload-file "dist/$ARTIFACT" \
                            "$NEXUS_URL/repository/$NEXUS_REPOSITORY/$ARTIFACT"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'CI pipeline completed successfully.'
        }

        failure {
            echo 'CI pipeline failed. Review the stage logs.'
        }

        always {
            echo 'Pipeline execution finished.'
        }
    }
}
