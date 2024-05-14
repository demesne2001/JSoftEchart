
pipeline {
    agent any
   
    
    stages {
        stage('checkout') {
            steps {
               checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'demesne2001', url: 'https://github.com/demesne2001/JSoftEchart.git']])
                echo 'checkout done'
            }
        }
        stage('Docker Image') {
            steps {
                
                script{
                    def a=0
                    bat 'docker build . -f dockerfile.txt -t  jsoftfronte'
                    a=1
                    if(a>0)
                    {
                         bat 'docker stop jsoftfronte'
                         bat 'docker rm jsoftfronte'
                    }
                }
                echo 'Docker Image done'
            }
        }
        stage('Docker Run') {
            steps {
                script{
                    bat 'docker run -p 10152:10152 -d --name jsoftfronte jsoftfronte'
                }
                echo 'Docker Running'
            }
        }
        stage('Docker push') {
            steps {
                script{
                    bat 'docker login -u patelom0910 -p 09102001Om'
                }
                echo 'Docker push done'
            }
        }
    }
}
