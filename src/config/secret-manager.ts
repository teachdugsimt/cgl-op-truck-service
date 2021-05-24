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
  // async createSecret(secretName, secretString, options = {}) {
  //   var params = {
  //     Name: secretName,
  //     SecretString: JSON.stringify(secretString),
  //     ...options,
  //   };
  //   const result = await this.secretsmanager
  //     .createSecret(params)
  //     .promise()
  //     .catch(async (error) => {
  //       throw await buildResponse.Build(500, null, 'E5000', '', 'Cannot create Secrets Manager', error, false);
  //     });
  //   return result;
  // }

  /**
   * @function [PUT] put secret string from secretId
   * @Input - secretId, secretString
   * @Return - {?}
   * @Remark - replace old secretString with new secretString
   */

  // async putSecertString(secretId, secretString, versionStages = null) {
  //   try {
  //     let tagVersions = [];
  //     tagVersions.push(CURRENT_VERSION);
  //     const { VersionStages, SecretString: originalValue } = await this.getSecretStringResponseAll(secretId);
  //     const secretStringObj = Object.assign(JSON.parse(originalValue), secretString);
  //     if (!versionStages) {
  //       if (VersionStages.length === 1 && VersionStages.find((element) => element === CURRENT_VERSION)) {
  //         tagVersions.push(VERSION_STAGE_NAME.concat(1));
  //       } else {
  //         const lastStrVersion = VersionStages.sort().reverse()[0];
  //         const lastNumbVersion = parseInt(lastStrVersion.substr(VERSION_STAGE_NAME.length)) + 1;
  //         tagVersions.push(VERSION_STAGE_NAME.concat(lastNumbVersion));
  //       }
  //     } else {
  //       tagVersions.push(versionStages);
  //     }

  //     const params = {
  //       SecretId: secretId,
  //       SecretString: JSON.stringify(secretStringObj),
  //       VersionStages: tagVersions,
  //     };

  //     const result = await this.secretsmanager
  //       .putSecretValue(params)
  //       .promise()
  //       .catch(async (error) => {
  //         throw await buildResponse.Build(500, null, 'E5000', '', 'Cannot put Secrets Manager', error, false);
  //       });
  //     return result;
  //   } catch (error) {
  //     if (error && error.body) {
  //       const { code, statusCode } = JSON.parse(error.body).responseData;
  //       if (code === 'ResourceNotFoundException' && statusCode === 400) {
  //         const createSecret = await this.createSecret(secretId, secretString);
  //         return Promise.resolve(createSecret);
  //       }
  //     }
  //     throw error;
  //   }
  // }

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
  // async getSecretStringResponseAll(secretId: string, versionStage: any = null) {
  //   const params: {
  //     SecretId: string
  //     VersionStage: any
  //   } = {
  //     SecretId: secretId,
  //     VersionStage: versionStage,
  //   };

  //   const result = await this.secretsmanager
  //     .getSecretValue(params)
  //     .promise()
  //     .catch(async (error: any) => {
  //       throw error;
  //     });
  //   return result;
  // }

  /**
   * @function [UPDATE] update secret string from secretId
   * @Input - secretId, secretString
   * @Return - {?}
   * @Remark - update old secretString with new secretString
   * @Remark - old secretString be lost
   */

  // async updateSecretString(secretId, secretString) {
  //   const { SecretString: originalValue } = await this.getSecretStringResponseAll(secretId);
  //   const secretStringObj = Object.assign(JSON.parse(originalValue), secretString);

  //   var params = {
  //     SecretId: secretId,
  //     SecretString: JSON.stringify(secretStringObj),
  //   };
  //   const result = await this.secretsmanager
  //     .updateSecret(params)
  //     .promise()
  //     .catch(async (error) => {
  //       throw await buildResponse.Build(
  //         500,
  //         null,
  //         'E5000',
  //         '',
  //         'Cannot update string of Secrets Manager',
  //         error,
  //         false
  //       );
  //     });
  //   return result;
  // }
}


// const main = async () => {
//   let secret_key = "CGLDevDbInstanceSecretA9F22-sti3vcA5nj2o"
//   const instance = new SecretsManager(null)
//   let tmp = await instance.getSecretString(secret_key)
//   console.log("Tmp :: ", tmp)
// }
// main()

// module.exports = SecretsManager;
