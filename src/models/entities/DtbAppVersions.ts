import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_app_versions_pkey", ["id"], { unique: true })
@Entity("dtb_app_versions", { schema: "public" })
export class DtbAppVersions {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "app_id", length: 254 })
  appId: string;

  @Column("character varying", {
    name: "app_name",
    nullable: true,
    length: 254,
  })
  appName: string | null;

  @Column("integer", { name: "platform", default: () => "0" })
  platform: number;

  @Column("character varying", {
    name: "version_number",
    length: 254,
    default: () => "'1.0.0'",
  })
  versionNumber: string;

  @Column("integer", { name: "build_number", default: () => "1" })
  buildNumber: number;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 2000,
    default: () => "NULL::character varying",
  })
  description: string | null;

  @Column("boolean", { name: "is_active", default: () => "false" })
  isActive: boolean;

  @Column("integer", { name: "version", default: () => "0" })
  version: number;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @Column("character varying", {
    name: "created_user",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  createdUser: string | null;

  @Column("character varying", {
    name: "updated_user",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  updatedUser: string | null;

  @Column("boolean", { name: "is_deleted", default: () => "false" })
  isDeleted: boolean;
}
