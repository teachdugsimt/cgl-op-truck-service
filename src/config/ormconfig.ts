import { ConnectionOptions } from 'typeorm'
// import SecretsManager from '../../../utility-layer/src/helper/secret-manager'
const secret_key = process.env.SECRET_KEY || "CGLDevDbInstance"
const region_aws = process.env.REGION || "ap-southeast-1"
// const secreteManager = new SecretsManager(region_aws || null)
interface SecretValue {
  password: string
  engine: string
  port: number
  dbInstanceIdentifier: string
  host: string
  username: string
}

const main = async () => {

  // const data: SecretValue = await secreteManager.getSecretString(secret_key)
  // console.log("Secrete Value Object :: ", data)
  const config: ConnectionOptions = {
    type: "postgres",
    // name: data.dbInstanceIdentifier || "cgl-dev-db",
    // host: data.host || "cgl-dev-db.chbn9ns43yos.ap-southeast-1.rds.amazonaws.com",
    // port: data.port || 5432,
    // username: data.username || "postgres",
    // password: data.password || "=5BjfT_-uaa98yYymACI2415a==LA,",
    name: "cgl-dev-db",
    host: "cgl-dev-db.chbn9ns43yos.ap-southeast-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "=5BjfT_-uaa98yYymACI2415a==LA,",
    logging: true,

    // entities: [__dirname + "/*.ts"],
    // entities: [__dirname + "/*.entity.ts"],
    // entities: [Quotation, Role],
    entities: ['src/models/truck.entity.ts'],

    synchronize: false,
    dropSchema: false,  // drop table in every start connect

    // migrationsTransactionMode: "all",
    // migrationsTableName: 'dtb_role',
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
