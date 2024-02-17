pipeline {
  agent any
  options {
        buildDiscarder(logRotator(daysToKeepStr: '10', numToKeepStr: '10'))
        timeout(time: 12, unit: 'HOURS')
        timestamps()
    }
  stages {
    // Separated stages
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/mandy8055/webpack-revision-project.git'
      }
    }
    stage('Install Dependencies') {
      steps {
        sh 'pnpm install'
      }
    }
    stage('Lint and Unit Test') {
      steps {
        sh 'pnpm run lint'
        sh 'pnpm run test'
      }
    }
    stage('Build') {
      steps {
        script {
          // Run the npm build command
          def npmBuildOutput = catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            sh 'pnpm run build'
          }
          
          // Check if the build command was successful
          if (currentBuild.result == 'SUCCESS') {
            echo 'Build successful'
          } else {
            echo "Build failed: ${npmBuildOutput}"
          }
        }
        // this step archives the report
        archiveArtifacts allowEmptyArchive: true,
          artifacts: 'dist/**',
          fingerprint: true,
          onlyIfSuccessful: true
      }
    }
    stage('Deploy to S3') {
      steps {
        withAWS(region: 'ap-south-1', credentials: 'aws-creds') { // aws-creds - ID of aws creds in global Jenkins
          s3Upload(pathStyleAccessEnabled: true,
        payloadSigningEnabled: true,
        includePathPattern: 'dist/**', // Upload all files and folders recursively
        // includePathPattern: '**', // Upload all files and folders recursively
        // excludePathPattern: 'dist/', // Exclude the 'dist' folder itself
        bucket: 'react-jenkins-setup',
        // workingDir: 'dist' // Set the working directory to 'dist' folder
        )
        }
      }
    }
    stage('Invalidate Cache and deploy to cloudfront') {
      steps {
        withCredentials([
          // Specify the ID of the AWS credentials stored in Jenkins
          [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']
        ]) {
          // Run the AWS CLI command using the stored credentials
          sh '''
            # Set AWS CLI configuration
            export AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY"
            export AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY"
            export AWS_DEFAULT_REGION="ap-south-1"
            
            # Run the AWS CLI command to create a CloudFront invalidation
            aws cloudfront create-invalidation --distribution-id E3CNBPTR7GC90J --paths '/*'
          '''
        }
      }
    }
  }
}