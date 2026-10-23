pipeline {
    agent {
        docker {
            image 'node:22.16.0-bookworm-slim'
            args '--network week5-ci'
            reuseNode true
        }
    }

    options {
        timestamps()
        timeout(time: 10, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(
            numToKeepStr: '20',
            artifactNumToKeepStr: '10'
        ))
    }

    environment {
        NEXUS_REGISTRY = 'http://week5-nexus:8081/repository/week5-npm-releases/'
        NEXUS_HOST = 'week5-nexus:8081'
        PACKAGE_NAME = 'kijanikiosk-payments'
    }

    stages {
        stage('Lint') {
            steps {
                sh '''
                    set -eu
                    node --version
                    npm --version
                    npm ci
                    npm run lint
                '''
            }
        }

        stage('Build') {
            steps {
                script {
                    env.GIT_SHA = env.GIT_COMMIT.take(7)

                    env.BASE_VERSION = sh(
                        script: "node -p \"require('./package.json').version\"",
                        returnStdout: true
                    ).trim()

                    env.PACKAGE_VERSION = "${env.BASE_VERSION}-${env.GIT_SHA}"
                    env.ARTIFACT = "${env.PACKAGE_NAME}-${env.PACKAGE_VERSION}.tgz"
                }

                sh '''
                    set -eu
                    echo "Building ${PACKAGE_NAME}@${PACKAGE_VERSION}"

                    npm version "$PACKAGE_VERSION" \
                        --no-git-tag-version \
                        --allow-same-version

                    rm -rf dist
                    mkdir -p dist
                    npm pack --pack-destination dist

                    test -s "dist/$ARTIFACT"
                    echo "Built artifact: dist/$ARTIFACT"
                '''
            }
        }

        stage('Parallel Verification') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh '''
                            set -eu
                            npm test
                        '''
                    }
                }

                stage('Security Audit') {
                    steps {
                        sh '''
                            set -eu
                            npm audit --audit-level=high
                        '''
                    }
                }
            }
        }

        stage('Archive and Fingerprint') {
            steps {
                sh '''
                    set -eu
                    test -s "dist/$ARTIFACT"
                    tar -tzf "dist/$ARTIFACT"
                    tar -xOzf "dist/$ARTIFACT" package/package.json
                '''

                archiveArtifacts(
                    artifacts: 'dist/*.tgz',
                    fingerprint: true
                )
            }
        }

        stage('Publish to Nexus') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'nexus-publisher',
                        usernameVariable: 'NEXUS_USER',
                        passwordVariable: 'NEXUS_PASSWORD'
                    )
                ]) {
                    sh '''
                        set -eu
                        set +x

                        cleanup() {
                            rm -f .npmrc
                        }
                        trap cleanup EXIT HUP INT TERM

                        AUTH_VALUE="$(printf '%s' \
                            "$NEXUS_USER:$NEXUS_PASSWORD" | base64 | tr -d '\\n')"

                        printf '%s\\n' \
                            "registry=${NEXUS_REGISTRY}" \
                            "//${NEXUS_HOST}/repository/week5-npm-releases/:_auth=${AUTH_VALUE}" \
                            "always-auth=true" \
                            > .npmrc

                        npm publish "dist/$ARTIFACT" \
                            --registry="$NEXUS_REGISTRY"

                        rm -f .npmrc
                        trap - EXIT HUP INT TERM

                        echo "Published ${PACKAGE_NAME}@${PACKAGE_VERSION}"
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
            cleanWs()
        }

        success {
            echo 'CI pipeline completed successfully.'
        }

        failure {
            echo 'CI pipeline failed. Review the stage logs.'
        }

        changed {
            echo 'Pipeline result changed from the previous build.'
        }
    }
}
