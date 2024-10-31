pipeline {
    agent any

    environment {
        NODE_ENV = "${env.BRANCH_NAME == 'prod' ? 'prod' : 'staging'}"
        TARGET_SERVER_IP = "${env.BRANCH_NAME == 'prod' ? '77.37.86.76' : '<IP_KMV1>'}"
        MY_SECRET = credentials('toto') // ID utilisé lors de la création du credential
    }

    options {
        skipDefaultCheckout(true)
    }

    stages {
        // stage('Verify Branch') {
        //     when {
        //         expression { env.BRANCH_NAME == 'prod' || env.BRANCH_NAME == 'staging' }
        //     }
        //     steps {
        //         echo "Triggering build for branch: ${env.BRANCH_NAME}"
        //     }
        // }

        // stage('Log Branch and Environment') {
        //     steps {
        //         script {
        //             echo "***************************************************"
        //             echo "Branch: ${env.BRANCH_NAME}"
        //             echo "Environment: ${NODE_ENV}"
        //             echo "Target Server IP: ${TARGET_SERVER_IP}"
        //             echo "***************************************************"
        //         }
        //     }
        // }

        stage('Log Environment Variables') {
            steps {
                script {
                    // Affichage des variables définies dans Jenkins
                    echo "La valeur de******* MY_SECRET est : ${MY_SECRET}"
                    sh 'echo "La valeur de MY_SECRET est : $MY_SECRET"'
                }
            }
        }

        // stage('Clean Workspace') {
        //     steps {
        //         deleteDir() // Supprime tout le contenu du répertoire de travail
        //     }
        // }

        // stage('Checkout Code') {
        //     steps {
        //         checkout([$class: 'GitSCM', branches: [[name: '*/prod']],
        //             userRemoteConfigs: [[url: 'https://github.com/djaouedkh/theTipTop.git', credentialsId: 'github-token']],
        //             extensions: [[$class: 'CloneOption', noTags: false, reference: '', shallow: false, timeout: 700]]
        //         ])
        //     }
        // }

        // stage('Run Tests') {
        //     stages {
        //         stage('Backend Tests') {
        //             steps {
        //                 dir('backend') {
        //                     script {
        //                         def backendTestImage = docker.build("myapp-backend-test:${NODE_ENV}", "--target test -f ./Dockerfile .")
        //                         backendTestImage.inside {
        //                             sh 'npx jest'
        //                         }
        //                         backendTestImage.remove()
        //                     }
        //                 }
        //             }
        //         }
                // stage('Frontend Tests') {
                //     steps {
                //         dir('frontend') {
                //             script {
                //                 // Spécifie le chemin relatif vers le Dockerfile dans le répertoire frontend
                //                 def frontendTestImage = docker.build("myapp-frontend-test:${NODE_ENV}", "-f ./Dockerfile .")
                //                 frontendTestImage.inside {
                //                     sh 'ng test --watch=false'
                //                 }
                //                 frontendTestImage.remove()
                //             }
                //         }
                //     }
                // }
        //     }
        // }



        // stage('Build for Production') {
        //     parallel {
        //         stage('Build Backend') {
        //             steps {
        //                 dir('backend') {
        //                     sh """
        //                         docker build --no-cache --build-arg NODE_ENV=${env.NODE_ENV} \
        //                         -t ghcr.io/djaouedkh/myapp-backend:${env.NODE_ENV} .
        //                     """
        //                 }
        //             }
        //         }
        //         stage('Build Frontend') {
        //             steps {
        //                 dir('frontend') {
        //                     sh """
        //                         docker build --no-cache --build-arg NODE_ENV=${env.NODE_ENV} \
        //                         -t ghcr.io/djaouedkh/myapp-frontend:${env.NODE_ENV} .
        //                     """
        //                 }
        //             }
        //         }
        //     }
        // }

        // stage('Push Images to GitHub Packages') {
        //     steps {
        //         withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
        //             script {
        //                 sh 'echo $GITHUB_TOKEN | docker login ghcr.io -u djaouedkh --password-stdin'
        //                 sh "docker push ghcr.io/djaouedkh/myapp-backend:${env.NODE_ENV}"
        //                 sh "docker push ghcr.io/djaouedkh/myapp-frontend:${env.NODE_ENV}"
        //             }
        //         }
        //     }
        // }

        // stage('Prepare Directory on Target Server') {
        //     steps {
        //         script {
        //             sh "ssh root@${TARGET_SERVER_IP} 'mkdir -p /home/root/theTipTop/'"
        //         }
        //     }
        // }

        // stage('Copy Docker Compose to Target Server') {
        //     steps {
        //         script {
        //             sh "scp docker-compose.yml root@${TARGET_SERVER_IP}:/home/root/theTipTop/"
        //         }
        //     }
        // }

        // stage('Deploy') {
        //     steps {
        //         script {
        //             sh "ssh root@${TARGET_SERVER_IP} 'export NODE_ENV=${env.NODE_ENV} && docker-compose -f /home/root/theTipTop/docker-compose.yml up -d'"
        //         }
        //     }
        // }
    }
}