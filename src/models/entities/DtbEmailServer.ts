import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_email_server_pkey", ["id"], { unique: true })
@Entity("dtb_email_server", { schema: "public" })
export class DtbEmailServer {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "mail_id" })
  mailId: number;

  @Column("character varying", {
    name: "mail_hostname",
    nullable: true,
    length: 150,
    default: () => "NULL::character varying",
  })
  mailHostname: string | null;

  @Column("character varying", {
    name: "mail_username",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  mailUsername: string | null;

  @Column("character varying", {
    name: "mail_password",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  mailPassword: string | null;

  @Column("character varying", {
    name: "mail_default",
    nullable: true,
    length: 10,
    default: () => "'smtp'",
  })
  mailDefault: string | null;

  @Column("character varying", {
    name: "mail_secure",
    nullable: true,
    length: 10,
    default: () => "'ssl'",
  })
  mailSecure: string | null;

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

  @Column("integer", { name: "mail_port", nullable: true })
  mailPort: number | null;

  @Column("integer", { name: "limit_email" })
  limitEmail: number;
}
