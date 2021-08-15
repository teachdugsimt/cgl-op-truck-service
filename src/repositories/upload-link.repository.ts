import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const documentClient = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION || 'ap-southeast-1' })

export default class TruckDynamodbRepository {

  async createUploadLinkData(objectLink: UploadLink): Promise<any> {
    const params = {
      TableName: process.env.UPLOAD_LINK_DYNAMO || 'cgl_truck_upload_link',
      Item: objectLink
    };

    return documentClient.put(params).promise();
  }

  async deleteUploadLink(truck_id: string | number): Promise<any> {
    const params = {
      TableName: process.env.UPLOAD_LINK_DYNAMO || 'cgl_truck_upload_link',
      Key: {
        truck_id
      }
    };

    return documentClient.delete(params).promise();
  }

  async findAttachCodeWithTruck(truck_id: number | string): Promise<any> {
    const params = {
      TableName: process.env.UPLOAD_LINK_DYNAMO || 'cgl_truck_upload_link',
      Key: {
        truck_id,
      },
    };
    const { Item } = await documentClient.get(params).promise();
    return Item && Object.keys(Item)?.length ? Item : null
  }

  async updateToken(objectLink: UploadLink): Promise<any> {
    const params: DocumentClient.UpdateItemInput = {
      TableName:  process.env.UPLOAD_LINK_DYNAMO || 'cgl_truck_upload_link',
      Key: { truck_id: objectLink.truck_id },
      UpdateExpression: 'set #tok = :newToken',
      ExpressionAttributeValues: {
        ':newToken': objectLink.token
      },
      ExpressionAttributeNames: {
        '#tok': 'token'
      }
    };

    return documentClient.update(params).promise();
  }

}

export interface UploadLink {
  token: string
  truck_id: string | number
}
