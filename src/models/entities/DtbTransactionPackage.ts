import { Column, Entity } from "typeorm";

@Entity("dtb_transaction_package", { schema: "public" })
export class DtbTransactionPackage {
  @Column("integer", { name: "transaction_id", default: () => "0" })
  transactionId: number;

  @Column("numeric", { name: "price", nullable: true, precision: 12, scale: 2 })
  price: string | null;

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

  @Column("integer", { name: "carrier_id", nullable: true })
  carrierId: number | null;
}
