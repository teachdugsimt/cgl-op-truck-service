import aws from 'aws-sdk'

export default class SecretsManager {
  secretsmanager: aws.SecretsManager
  constructor(region: string | null) {
    this.secretsmanager = new aws.SecretsManager({ region: region || 'ap-southeast-1' });
  }

  /**
  * @function [CREATE] create secret manager
  * @Input - secretName, secretString, options
  * @Return - {?}
  * @Remark - options is object
  * @Remark - attribute in options is
      ClientRequestToken: 'STRING_VALUE',
      Description: 'STRING_VALUE',
      KmsKeyId: 'STRING_VALUE',
      SecretBinary: Buffer.from('...') || 'STRING_VALUE'
      Tags: [
          {
          Key: 'STRING_VALUE',
          Value: 'STRING_VALUE'
          },
      ]
  */

  /**
   * @function [PUT] put secret string from secretId
   * @Input - secretId, secretString
   * @Return - {?}
   * @Remark - replace old secretString with new secretString
   */

  /**
   * @function [GET] get secret string from secretId
   * @Input - secretId
   * @Return - secretString
   * @Output - data of secrete value
   */
  async getSecretString(secretId: string, versionStage: any = null) {
    const params: {
      SecretId: string
      VersionStage: any
    } = {
      SecretId: secretId,
      VersionStage: versionStage,
    };

    const result: any = await this.secretsmanager
      .getSecretValue(params)
      .promise()
      .catch(async (error) => {
        throw error
      });
    return JSON.parse(result.SecretString);
  }

  /**
   * @function [GET] get secret string from secretId
   * @Input - secretId
   * @Return - secretString
   * @Output - data of secrete name
   */

  /**
   * @function [UPDATE] update secret string from secretId
   * @Input - secretId, secretString
   * @Return - {?}
   * @Remark - update old secretString with new secretString
   * @Remark - old secretString be lost
   */

}
