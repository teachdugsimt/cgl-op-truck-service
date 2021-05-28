import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_web_token_pkey", ["id"], { unique: true })
@Entity("dtb_web_token", { schema: "public" })
export class DtbWebToken {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "user_id" })
  userId: number;

  @Column("character varying", {
    name: "token",
    nullable: true,
    length: 2048,
    default: () => "NULL::character varying",
  })
  token: string | null;

  @Column("integer", { name: "version", default: () => "0" })
  version: number;

  @Column("character varying", {
    name: "browser",
    length: 25,
    default: () => "0",
  })
  browser: string;

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
