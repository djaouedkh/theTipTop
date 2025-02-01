pipeline {
    agent any

    stages {
        stage('Clone repo') {
            steps {
                echo 'Clonage du dépôt'
                // Supprime d'abord le dossier s'il existe déjà
                sh 'rm -fr testAppClone'
                // Clone le dépôt dans le dossier testAppClone
                sh 'git clone https://github.com/djaouedkh/theTipTop.git testAppClone'
            }
        }
        stage('Hello') {
            steps {
                echo 'Hello World env.BRANCH_NAME'
                // faire un echo et afficher le nom de la branche
                echo env.BRANCH_NAME
            }
        }
        stage('Clean up') {
            steps {
                echo 'Nettoyage du répertoire cloné'
                sh 'rm -fr testAppClone'
            }
        }
    }
}
