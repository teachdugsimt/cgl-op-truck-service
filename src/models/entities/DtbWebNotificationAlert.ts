import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_web_notification_alert_pkey", ["id"], { unique: true })
@Entity("dtb_web_notification_alert", { schema: "public" })
export class DtbWebNotificationAlert {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "user_id", nullable: true, default: () => "0" })
  userId: number | null;

  @Column("integer", { name: "templates_code" })
  templatesCode: number;

  @Column("character varying", {
    name: "data_alert",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  dataAlert: string | null;

  @Column("smallint", { name: "type", default: () => "0" })
  type: number;

  @Column("integer", { name: "status", default: () => "0" })
  status: number;

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

  @Column("integer", { name: "admin_id", nullable: true })
  adminId: number | null;

  @Column("integer", { name: "user_type", nullable: true, default: () => "1" })
  userType: number | null;

  @Column("boolean", {
    name: "is_showed",
    nullable: true,
    default: () => "false",
  })
  isShowed: boolean | null;
}
