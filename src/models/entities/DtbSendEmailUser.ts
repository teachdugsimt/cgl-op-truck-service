import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_send_email_user_pkey", ["id"], { unique: true })
@Entity("dtb_send_email_user", { schema: "public" })
export class DtbSendEmailUser {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "admin_id" })
  adminId: number;

  @Column("integer", { name: "user_id" })
  userId: number;

  @Column("integer", { name: "templates_code" })
  templatesCode: number;

  @Column("text", { name: "data_mail", nullable: true })
  dataMail: string | null;

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
}
