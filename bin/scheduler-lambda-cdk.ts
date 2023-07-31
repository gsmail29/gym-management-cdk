#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SchedulerLambdaCdkStack } from '../lib/scheduler-lambda-cdk-stack';

const app = new cdk.App();
new SchedulerLambdaCdkStack(app, 'SchedulerLambdaCdkStack');
