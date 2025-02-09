// pipeline {
//     agent any
//     stages {
//         stage('Checkout Code') {
//             steps {
//                 checkout([$class: 'GitSCM',
//                     branches: [[name: '*/' + env.BRANCH_NAME]], // Cloner la branche qui a déclenché le build
//                     userRemoteConfigs: [[url: 'https://github.com/djaouedkh/theTipTop.git', credentialsId: 'github-token']],
//                     extensions: [[$class: 'CloneOption', noTags: false, reference: '', shallow: false, timeout: 700]]
//                 ])
//             }
//         }

//         stage('Build Docker Image Backend') {
//             steps {
//                 withCredentials([file(credentialsId: 'env-prod', variable: 'ENV_FILE')]) {
//                     sh '''
//                         echo "Construction de l'image Docker..."
//                         docker build -t 185.97.146.217:5000/mon-backend:latest -f backend/Dockerfile backend/
//                     '''
//                 }
//             }
//         }
//         stage('Build Docker Image Frontend') {
//             steps {
//                 script {
//                     def buildCommand = env.BRANCH_NAME == 'prod' ? 'npm run build:prod' : (env.BRANCH_NAME == 'staging' ? 'npm run build:staging' : 'npm run build')
//                     sh """
//                         echo "Construction de l'image Docker pour le front-end..."
//                         docker build --build-arg BUILD_COMMAND="${buildCommand}" -t 185.97.146.217:5000/mon-frontend:latest -f frontend/Dockerfile frontend/
//                     """
//                 }
//             }
//         }
//         stage('Push Docker Images') {
//             steps {
//                 withCredentials([usernamePassword(credentialsId: 'docker-registry', passwordVariable: 'REGISTRY_PASS', usernameVariable: 'REGISTRY_USER')]) {
//                     sh '''
//                         echo "Connexion au Docker Registry..."
//                         echo $REGISTRY_PASS | docker login http://185.97.146.217:5000 -u $REGISTRY_USER --password-stdin

//                         echo "Push des images vers le registry..."
//                         docker push 185.97.146.217:5000/mon-backend:latest
//                         docker push 185.97.146.217:5000/mon-frontend:latest
//                     '''
//                 }
//             }
//         }






//         stage('Deploy Services with Docker Compose') {
//             steps {
//                 withCredentials([file(credentialsId: 'env-prod', variable: 'ENV_FILE')]) {
//                     // sh '''
//                     //     echo "Arrêt et suppression des anciens conteneurs..."
//                     //     docker-compose -f docker-compose.yml --env-file $ENV_FILE down

//                     //     echo "Démarrage du déploiement avec Docker Compose..."
//                     //     docker-compose -f docker-compose.yml --env-file $ENV_FILE up -d --build
//                     // '''
//                     sh '''
//                         echo "Arrêt et suppression des anciens conteneurs..."
//                         docker-compose -f docker-compose.yml --env-file $ENV_FILE down

//                         echo "Démarrage du déploiement avec Docker Compose..."
//                         docker-compose -f docker-compose.yml --env-file $ENV_FILE up -d
//                     '''
//                 }
//             }
//         }
//     }
// }
















































pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/' + env.BRANCH_NAME]], // Cloner la branche déclenchante
                    userRemoteConfigs: [[url: 'https://github.com/djaouedkh/theTipTop.git', credentialsId: 'github-token']],
                    extensions: [[$class: 'CloneOption', noTags: false, reference: '', shallow: false, timeout: 700]]
                ])
            }
        }
        
        stage('Build Docker Image Backend') {
            steps {
                // Sélection du credential en fonction de la branche
                script {
                    def envCredentialId = (env.BRANCH_NAME == 'prod') ? 'env-prod' : 'env-pre-prod'
                    // Définir un suffixe pour distinguer les images
                    env.ENV_SUFFIX = (env.BRANCH_NAME == 'prod') ? "prod" : "preprod"
                    withCredentials([file(credentialsId: envCredentialId, variable: 'ENV_FILE')]) {
                        sh '''
                            echo "Construction de l'image Docker Backend (${ENV_SUFFIX})..."
                            docker build -t 185.97.146.217:5000/mon-backend-${ENV_SUFFIX}:latest -f backend/Dockerfile backend/
                        '''
                    }
                }
            }
        }
        
        stage('Build Docker Image Frontend') {
            steps {
                script {
                    def buildCommand = (env.BRANCH_NAME == 'prod') ? 'npm run build:prod' : 'npm run build:pre-prod'
                    // Remarquez que dans votre configuration vous utilisiez staging, ici on le remplace par pre-prod
                    sh """
                        echo "Construction de l'image Docker pour le Frontend (${ENV_SUFFIX})..."
                        docker build --build-arg BUILD_COMMAND="${buildCommand}" -t 185.97.146.217:5000/mon-frontend-${ENV_SUFFIX}:latest -f frontend/Dockerfile frontend/
                    """
                }
            }
        }
        
        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-registry', passwordVariable: 'REGISTRY_PASS', usernameVariable: 'REGISTRY_USER')]) {
                    sh '''
                        echo "Connexion au Docker Registry..."
                        echo $REGISTRY_PASS | docker login http://185.97.146.217:5000 -u $REGISTRY_USER --password-stdin

                        echo "Push des images..."
                        docker push 185.97.146.217:5000/mon-backend-${ENV_SUFFIX}:latest
                        docker push 185.97.146.217:5000/mon-frontend-${ENV_SUFFIX}:latest
                    '''
                }
            }
        }
        
        stage('Deploy Services with Docker Compose') {
            steps {
                script {
                    // Choix du credential pour le déploiement
                    def envDeployCredentialId = (env.BRANCH_NAME == 'prod') ? 'env-prod' : 'env-pre-prod'
                    // Définir la variable FRONT_DOMAIN qui sera utilisée par Traefik
                    env.FRONT_DOMAIN = (env.BRANCH_NAME == 'prod') ? "icademie-djaoued-khatir.fr" : "preprod.icademie-djaoued-khatir.fr"
                    
                    withCredentials([file(credentialsId: envDeployCredentialId, variable: 'ENV_FILE')]) {
                        sh """
                            echo "Déploiement des services pour ${ENV_SUFFIX}..."
                            export ENV_SUFFIX=${ENV_SUFFIX}
                            export FRONT_DOMAIN=${FRONT_DOMAIN}
                            export BACKEND_IMAGE=185.97.146.217:5000/mon-backend-${ENV_SUFFIX}:latest
                            export FRONTEND_IMAGE=185.97.146.217:5000/mon-frontend-${ENV_SUFFIX}:latest

                            echo "Arrêt des anciens conteneurs..."
                            docker-compose -f docker-compose.yml --env-file \$ENV_FILE down

                            echo "Démarrage du déploiement avec Docker Compose..."
                            docker-compose -f docker-compose.yml --env-file \$ENV_FILE up -d
                        """
                    }
                }
            }
        }
    }
}
