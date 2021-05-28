import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_line_user_pkey", ["id"], { unique: true })
@Entity("dtb_line_user", { schema: "public" })
export class DtbLineUser {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "phone_number", length: 30 })
  phoneNumber: string;

  @Column("character varying", { name: "line_id", length: 50 })
  lineId: string;

  @Column("integer", { name: "role", default: () => "0" })
  role: number;

  @Column("character varying", {
    name: "code",
    nullable: true,
    length: 30,
    default: () => "NULL::character varying",
  })
  code: string | null;

  @Column("text", { name: "fullname", nullable: true })
  fullname: string | null;

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
