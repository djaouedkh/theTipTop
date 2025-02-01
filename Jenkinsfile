pipeline {
    agent any
    stages {
        // stage('Clone repo') {
        //     steps {
        //         echo 'Clonage du dépôt'
        //         // Supprime d'abord le dossier s'il existe déjà
        //         sh 'rm -fr testAppClone'
        //         // Clone le dépôt dans le dossier testAppClone
        //         sh 'git clone https://github.com/djaouedkh/theTipTop.git testAppClone'
        //     }
        // }
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
        // stage('Clean up') {
        //     steps {
        //         echo 'Nettoyage du répertoire cloné'
        //         sh 'rm -fr testAppClone'
        //     }
        // }

        // stage('Checkout Code') {
        //     steps {
        //         checkout([$class: 'GitSCM',
        //             branches: [[name: '*/' + env.BRANCH_NAME]], // Cloner la branche qui a déclenché le build
        //             userRemoteConfigs: [[url: 'https://github.com/djaouedkh/theTipTop.git', credentialsId: 'github-token']],
        //             extensions: [[$class: 'CloneOption', noTags: false, reference: '', shallow: false, timeout: 700]]
        //         ])
        //     }
        // }

        // stage('Build Docker Image Backend') {
        //     steps {
        //         withCredentials([file(credentialsId: 'env-prod', variable: 'ENV_FILE')]) {
        //             sh '''
        //                 echo "Construction de l'image Docker..."
        //                 docker build -t 185.97.146.217:5000/mon-backend:latest -f backend/Dockerfile backend/
        //             '''
        //         }
        //     }
        // }
        // stage('Build Docker Image Frontend') {
        //     steps {
        //         script {
        //             def buildCommand = env.BRANCH_NAME == 'prod' ? 'npm run build:prod' : (env.BRANCH_NAME == 'staging' ? 'npm run build:staging' : 'npm run build')
        //             sh """
        //                 echo "Construction de l'image Docker pour le front-end..."
        //                 docker build --build-arg BUILD_COMMAND="${buildCommand}" -t 185.97.146.217:5000/mon-frontend:latest -f frontend/Dockerfile frontend/
        //             """
        //         }
        //     }
        // }
        // stage('Push Docker Images') {
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: 'docker-registry', passwordVariable: 'REGISTRY_PASS', usernameVariable: 'REGISTRY_USER')]) {
        //             sh '''
        //                 echo "Connexion au Docker Registry..."
        //                 echo $REGISTRY_PASS | docker login http://185.97.146.217:5000 -u $REGISTRY_USER --password-stdin

        //                 echo "Push des images vers le registry..."
        //                 docker push 185.97.146.217:5000/mon-backend:latest
        //                 docker push 185.97.146.217:5000/mon-frontend:latest
        //             '''
        //         }
        //     }
        // }






        // stage('Deploy Services with Docker Compose') {
        //     steps {
        //         withCredentials([file(credentialsId: 'env-prod', variable: 'ENV_FILE')]) {
        //             // sh '''
        //             //     echo "Arrêt et suppression des anciens conteneurs..."
        //             //     docker-compose -f docker-compose.yml --env-file $ENV_FILE down

        //             //     echo "Démarrage du déploiement avec Docker Compose..."
        //             //     docker-compose -f docker-compose.yml --env-file $ENV_FILE up -d --build
        //             // '''
        //             sh '''
        //                 echo "Arrêt et suppression des anciens conteneurs..."
        //                 docker-compose -f docker-compose.yml --env-file $ENV_FILE down

        //                 echo "Démarrage du déploiement avec Docker Compose..."
        //                 docker-compose -f docker-compose.yml --env-file $ENV_FILE up -d
        //             '''
        //         }
        //     }
        // }
    }
}
