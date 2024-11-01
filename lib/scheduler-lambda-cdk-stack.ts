import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class SchedulerLambdaCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const accountInfoTable = new dynamodb.Table(this, 'AccountInfo', {
      partitionKey: {name: 'accountId', type: dynamodb.AttributeType.STRING}
    });

    const mainHandler = new lambda.Function(this, 'MainHandler', {
      runtime: lambda.Runtime.JAVA_11,
      code: lambda.Code.fromAsset('/Users/gshaamzn/Documents/gym-man/gym-management/app/build/libs/app-uber.jar'),
      handler: 'scheduler.lambda.App::handleRequest',
      timeout: Duration.minutes(5),
      memorySize: 1024,
      environment: {
        ACCOUNT_INFO_TABLE_NAME: accountInfoTable.tableName
      }
    });
    accountInfoTable.grantReadWriteData(mainHandler);

    new apigw.LambdaRestApi(this, 'scheduler-endpoint', {
      handler: mainHandler
    })

  }
}
