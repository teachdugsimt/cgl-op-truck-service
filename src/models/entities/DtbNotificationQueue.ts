import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_notification_queue_pkey", ["id"], { unique: true })
@Entity("dtb_notification_queue", { schema: "public" })
export class DtbNotificationQueue {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "user_id" })
  userId: number;

  @Column("character varying", {
    name: "title",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  title: string | null;

  @Column("text", { name: "data_notification", nullable: true })
  dataNotification: string | null;

  @Column("smallint", { name: "type", default: () => "0" })
  type: number;

  @Column("integer", { name: "status", default: () => "0" })
  status: number;

  @Column("timestamp without time zone", {
    name: "date_send",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  dateSend: Date | null;

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

  @Column("integer", { name: "templates_code" })
  templatesCode: number;

  @Column("character varying", {
    name: "type_notification",
    length: 255,
    default: () => "'mobile'",
  })
  typeNotification: string;
}
