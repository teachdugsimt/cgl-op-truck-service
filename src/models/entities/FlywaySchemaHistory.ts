import { Column, Entity, Index } from "typeorm";

@Index("flyway_schema_history_pkey", ["installedRank"], { unique: true })
@Entity("flyway_schema_history", { schema: "public" })
export class FlywaySchemaHistory {
  @Column("integer", { primary: true, name: "installed_rank" })
  installedRank: number;

  @Column("character varying", { name: "version", nullable: true, length: 50 })
  version: string | null;

  @Column("character varying", { name: "description", length: 200 })
  description: string;

  @Column("character varying", { name: "type", length: 20 })
  type: string;

  @Column("character varying", { name: "script", length: 1000 })
  script: string;

  @Column("integer", { name: "checksum", nullable: true })
  checksum: number | null;

  @Column("character varying", { name: "installed_by", length: 100 })
  installedBy: string;

  @Column("timestamp without time zone", {
    name: "installed_on",
    default: () => "now()",
  })
  installedOn: Date;

  @Column("integer", { name: "execution_time" })
  executionTime: number;

  @Column("boolean", { name: "success" })
  success: boolean;
}
