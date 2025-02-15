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
        
        stage('Deploy Traefik') {
            steps {
                // Déploiement central de Traefik via son docker-compose
                sh "docker-compose -f docker-compose.traefik.yml up -d"
            }
        }

        stage('Run Backend Tests') {
            steps {
                echo "Lancement des tests backend..."
                // Exécute les tests dans un conteneur Node (ici version 20)
                sh "docker run --rm -v ${WORKSPACE}/backend:/app -w /app node:20 sh -c 'npm ci && npm run test'"

            }
        }

        stage('Run Frontend Tests') {
            steps {
                echo "Lancement des tests frontend en mode headless avec cypress/included:14.0.3..."
                sh "docker run --rm -v ${WORKSPACE}/frontend:/app -w /app cypress/included:14.0.3 --entrypoint sh -c \"npm ci && npx ng test --watch=false --browsers=ChromeHeadless --no-progress -- --no-sandbox\""
            }
        }

        stage('Build Docker Image Backend') {
            steps {
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
                    def envDeployCredentialId = (env.BRANCH_NAME == 'prod') ? 'env-prod' : 'env-pre-prod'
                    // Pour prod, le domaine est le domaine principal, pour pre-prod, un sous-domaine distinct
                    env.FRONT_DOMAIN = (env.BRANCH_NAME == 'prod') ? "icademie-djaoued-khatir.fr" : "preprod.icademie-djaoued-khatir.fr"
                    
                    withCredentials([file(credentialsId: envDeployCredentialId, variable: 'ENV_FILE')]) {
                        sh """
                            echo "Déploiement des services pour ${ENV_SUFFIX}..."
                            export ENV_SUFFIX=${ENV_SUFFIX}
                            export FRONT_DOMAIN=${FRONT_DOMAIN}
                            export BACKEND_IMAGE=185.97.146.217:5000/mon-backend-${ENV_SUFFIX}:latest
                            export FRONTEND_IMAGE=185.97.146.217:5000/mon-frontend-${ENV_SUFFIX}:latest

                            echo "Arrêt des anciens conteneurs pour le projet ${ENV_SUFFIX}..."
                            docker-compose -p ${ENV_SUFFIX} -f docker-compose.yml --env-file \$ENV_FILE down

                            echo "Démarrage du déploiement avec Docker Compose pour le projet ${ENV_SUFFIX}..."
                            docker-compose -p ${ENV_SUFFIX} -f docker-compose.yml --env-file \$ENV_FILE up -d
                        """
                    }
                }
            }
        }
    }
}
