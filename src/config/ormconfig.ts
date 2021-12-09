import { ConnectionOptions } from 'typeorm'
import { DtbTruck } from '../models/'
import SecretsManager from './secret-manager'
const secret_key = process.env.SECRET_KEY || "CGLDevDbInstance"
const region_aws = process.env.REGION || "ap-southeast-1"
const secreteManager = new SecretsManager(region_aws || null)
interface SecretValue {
  password: string
  engine: string
  port: number
  dbInstanceIdentifier: string
  host: string
  username: string
}

const main = async () => {

  const data: SecretValue = await secreteManager.getSecretString(secret_key)
  console.log("Secrete Value Object :: ", data)
  const config: ConnectionOptions = {
    type: "postgres",
    name: data.dbInstanceIdentifier || "cgl-dev-db",
    host: data.host || "cgl-dev-db.chbn9ns43yos.ap-southeast-1.rds.amazonaws.com",
    port: data.port || 5432,
    username: data.username || "postgres",
    password: data.password || "=5BjfT_-uaa98yYymACI2415a==LA,",
    logging: true,

    entities: [DtbTruck],

    synchronize: false,
    dropSchema: false,  // drop table in every start connect

    migrationsTransactionMode: "none",
    migrationsRun: true,
    migrations: [
      'src/migration/*{.ts,.js}'
    ],
    cli: {
      migrationsDir: "src/migration",
      entitiesDir: "src/models"
    }
  }
  return config

}

export = main()
