// pipeline {
//     agent any

//     // environment {
//     //     NODE_ENV = "${env.BRANCH_NAME == 'prod' ? 'prod' : 'staging'}"
//     //     TARGET_SERVER_IP = "${env.BRANCH_NAME == 'prod' ? '77.37.86.76' : '<IP_KMV1>'}"
//     //     MY_SECRET = credentials('toto') // ID utilisé lors de la création du credential
//     // }

//     options {
//         skipDefaultCheckout(true)
//     }

//     stages {
//         stage('Check Permissions') {
//     steps {
//         sh '''
//         whoami
//         ls -l .
//         '''
//     }
// }
//         stage('Setup Environment') {
//             steps {
//                 withCredentials([file(credentialsId: 'env-prod', variable: 'ENV_FILE')]) {
//                     sh 'cp $ENV_FILE /var/lib/jenkins/workspace/p_Top_-_CICD_multi_branches_prod/.env'
//                 }
//             }
//         }
//         stage('Verify Environment Variables') {
//             steps {
//                 script {
//                     // Affiche uniquement des lignes spécifiques, par exemple
//                     sh '''
//                     if [ -f .env ]; then
//                         echo ".env file found."
//                         grep "DATABASE_URL" .env || echo "DATABASE_URL not found in .env"
//                     else
//                         echo ".env file not found."
//                         exit 1
//                     fi
//                     '''
//                 }
//             }
//         }

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
//     }
// }



















pipeline {
    agent any
    stages {
        stage('Setup Environment') {
            steps {
                script {
                    // Déterminer l'ID du credential en fonction de la branche
                    def envFileId = ''
                    if (env.BRANCH_NAME == 'staging') {
                        envFileId = 'env-staging' // ID du credential pour .env.staging
                    } else if (env.BRANCH_NAME == 'prod') {
                        envFileId = 'env-prod' // ID du credential pour .env.prod
                    } else {
                        error("Aucun fichier d'environnement trouvé pour la branche : ${env.BRANCH_NAME}")
                    }

                    // Utiliser le credential pour écrire le contenu du fichier .env
                    withCredentials([file(credentialsId: envFileId, variable: 'ENV_FILE')]) {
                        sh '''
                            cat $ENV_FILE > .env
                        '''
                    }
                }
            }
        }
        // Autres étapes du pipeline...
    }
}
