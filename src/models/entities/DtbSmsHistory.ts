import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_sms_history_pkey", ["id"], { unique: true })
@Entity("dtb_sms_history", { schema: "public" })
export class DtbSmsHistory {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "phone_number",
    nullable: true,
    length: 20,
    default: () => "NULL::character varying",
  })
  phoneNumber: string | null;

  @Column("character varying", {
    name: "data",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  data: string | null;

  @Column("character varying", {
    name: "reason",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  reason: string | null;

  @Column("smallint", { name: "type", default: () => "0" })
  type: number;

  @Column("integer", { name: "status", default: () => "0" })
  status: number;

  @Column("timestamp without time zone", {
    name: "date_sent",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  dateSent: Date | null;

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
