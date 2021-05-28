import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_payment_configuration_pkey", ["id"], { unique: true })
@Entity("dtb_payment_configuration", { schema: "public" })
export class DtbPaymentConfiguration {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "type",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  type: string | null;

  @Column("character varying", {
    name: "value",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  value: string | null;

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
