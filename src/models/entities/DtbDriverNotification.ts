import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_driver_notification_pkey", ["id"], { unique: true })
@Entity("dtb_driver_notification", { schema: "public" })
export class DtbDriverNotification {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "notification_id" })
  notificationId: number;

  @Column("integer", { name: "driver_id" })
  driverId: number;

  @Column("integer", { name: "status", nullable: true, default: () => "0" })
  status: number | null;

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
