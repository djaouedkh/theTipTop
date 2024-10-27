pipeline {
    agent any // Utiliser n'importe quel agent disponible

    // Définition des variables d'environnement globales
    // environment {
    //     NODE_ENV = (env.BRANCH_NAME == 'prod') ? 'prod' : 'staging'
    // }

    stages {
        // Étape pour afficher la valeur de BRANCH_NAME et NODE_ENV
        stage('Log Branch and Environment') {
            steps {
                script {
                    echo "***************************************************ALLOOOOOOOOOOOOOOOOOOOOO***************************************************"
                    echo "***************************************************ALLOOOOOOOOOOOOOOOOOOOOO***************************************************"
                    echo "***************************************************ALLOOOOOOOOOOOOOOOOOOOOO***************************************************"
                    echo "***************************************************ALLOOOOOOOOOOOOOOOOOOOOO***************************************************"
                    // echo "BRANCH_NAME is: ${env.BRANCH_NAME}"
                    // echo "NODE_ENV is: ${env.NODE_ENV}"
                }
            }
        }

        // // Récupération du code source depuis le dépôt
        // stage('Checkout Code') {
        //     steps {
        //         checkout scm // Clonage du dépôt Git
        //     }
        // }

        // // Construction des images du backend et frontend
        // stage('Build') {
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
        
        // // Pousser les images dans GitHub Packages
        // stage('Push Images to GitHub Packages') {
        //     steps {
        //         withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
        //             script {
        //                 echo "GITHUB_TOKEN est bien chargé"
        //                 // Remplace 'username' par ton nom d'utilisateur GitHub
        //                 sh 'echo $GITHUB_TOKEN | docker login ghcr.io -u djaouedkh --password-stdin'
        //                 sh "docker push ghcr.io/djaouedkh/myapp-backend:${env.NODE_ENV}"
        //                 sh "docker push ghcr.io/djaouedkh/myapp-frontend:${env.NODE_ENV}"
        //             }
        //         }
        //     }
        // }

        // // Étape pour copier le fichier docker-compose.yml sur le serveur cible, permet de centraliser la configuration et d'avoir tjr la dernière version sur le serveur cible du pipeline
        // stage('Copy Docker Compose to target Server') {
        //     steps {
        //         script {
        //             def serverIp = (env.BRANCH_NAME == 'prod') ? '77.37.86.76' : '<IP_KMV1>'
        //             sh "scp docker-compose.yml root@${serverIp}:/home/root/theTipTop/"
        //         }
        //     }
        // }
        
        // stage('Deploy') {
        //     steps {
        //         script {
        //             def serverIp = (env.BRANCH_NAME == 'prod') ? '77.37.86.76' : '<IP_KMV1>'
        //             sh "ssh root@${serverIp} 'export NODE_ENV=${env.NODE_ENV} && docker-compose -f /home/root/theTipTop/docker-compose.yml up -d'"
        //         }
        //     }
        // }

    }
}
