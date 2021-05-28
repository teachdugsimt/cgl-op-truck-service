import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_fee_pkey", ["id"], { unique: true })
@Entity("dtb_fee", { schema: "public" })
export class DtbFee {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "name",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  name: string | null;

  @Column("double precision", {
    name: "value",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  value: number | null;

  @Column("boolean", { name: "active", nullable: true, default: () => "true" })
  active: boolean | null;

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
