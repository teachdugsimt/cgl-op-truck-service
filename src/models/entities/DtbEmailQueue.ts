import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_email_queue_pkey", ["id"], { unique: true })
@Entity("dtb_email_queue", { schema: "public" })
export class DtbEmailQueue {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "email_from",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  emailFrom: string | null;

  @Column("character varying", {
    name: "email_to",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  emailTo: string | null;

  @Column("character varying", {
    name: "email_templates",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  emailTemplates: string | null;

  @Column("integer", { name: "templates_code" })
  templatesCode: number;

  @Column("text", { name: "data_mail", nullable: true })
  dataMail: string | null;

  @Column("smallint", { name: "type", default: () => "0" })
  type: number;

  @Column("integer", { name: "status", default: () => "0" })
  status: number;

  @Column("integer", {
    name: "mail_server_id",
    nullable: true,
    default: () => "0",
  })
  mailServerId: number | null;

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

  @Column("date", { name: "date_send", nullable: true })
  dateSend: string | null;
}
