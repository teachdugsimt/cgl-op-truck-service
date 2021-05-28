import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_action_log_pkey", ["id"], { unique: true })
@Entity("dtb_action_log", { schema: "public" })
export class DtbActionLog {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "user_id", default: () => "0" })
  userId: number;

  @Column("integer", { name: "record_id", nullable: true })
  recordId: number | null;

  @Column("character varying", {
    name: "table_name",
    nullable: true,
    length: 255,
  })
  tableName: string | null;

  @Column("character varying", { name: "action", nullable: true, length: 150 })
  action: string | null;

  @Column("text", { name: "change_info", nullable: true })
  changeInfo: string | null;

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
