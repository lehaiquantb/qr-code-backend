import { camelCase, isArray, isPlainObject, mapKeys, snakeCase } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { App } from '@slack/bolt';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from 'src/app.module';
import ConfigKey from '../config/config-key';
export function generateHashToken(userId: number): string {
    const random = Math.floor(Math.random() * (10000 - 1000) + 1000);
    return `${userId}-${Date.now()}-${random}`;
}

export function extractToken(authorization = '') {
    if (/^Bearer /.test(authorization)) {
        return authorization.substr(7, authorization.length);
    }
    return '';
}

export function makeFileUrl(fileName: string): string {
    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}
export function parseToCamelCase(data: any) {
    let dataString = JSON.stringify(data);
    function parse(item: any) {
        mapKeys(item, function (value, key) {
            if (isPlainObject(item[key] as any)) {
                parse(item[key]);
            }
            if (isArray(item[key])) {
                item[key].forEach((childItem: any) => parse(childItem));
            }
            dataString = dataString.replace(key, camelCase(key));
        });
    }
    parse(data);
    return JSON.parse(dataString);
}
export function parseToSnakeCase(data: any) {
    let dataString = JSON.stringify(data);
    function parse(item: any) {
        mapKeys(item, function (value, key) {
            if (isPlainObject(item[key] as any)) {
                parse(item[key]);
            }
            if (isArray(item[key])) {
                item[key].forEach((childItem: any) => parse(childItem));
            }
            dataString = dataString.replace(key, snakeCase(key));
        });
    }
    parse(data);
    return JSON.parse(dataString);
}
