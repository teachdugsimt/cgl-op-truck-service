import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("mst_type_pkey", ["id"], { unique: true })
@Entity("mst_type", { schema: "public" })
export class MstType {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "type", length: 80 })
  type: string;

  @Column("character varying", { name: "name", length: 254 })
  name: string;

  @Column("integer", { name: "int_value", nullable: true })
  intValue: number | null;

  @Column("character varying", {
    name: "string_value",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  stringValue: string | null;

  @Column("character varying", {
    name: "image",
    nullable: true,
    length: 80,
    default: () => "NULL::character varying",
  })
  image: string | null;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 512,
    default: () => "NULL::character varying",
  })
  description: string | null;

  @Column("smallint", { name: "status", default: () => "1" })
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

  @Column("integer", { name: "group_id", nullable: true, default: () => "0" })
  groupId: number | null;

  @Column("integer", {
    name: "order_number",
    nullable: true,
    default: () => "0",
  })
  orderNumber: number | null;
}
