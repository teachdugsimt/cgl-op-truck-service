import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_quotation_pkey", ["id"], { unique: true })
@Entity("dtb_quotation", { schema: "public" })
export class DtbQuotation {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "carrier_id" })
  carrierId: number;

  @Column("integer", { name: "order_id" })
  orderId: number;

  @Column("smallint", { name: "status" })
  status: number;

  @Column("numeric", {
    name: "offered_total",
    nullable: true,
    precision: 12,
    scale: 2,
  })
  offeredTotal: string | null;

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

  @Column("boolean", { name: "is_viewed", default: () => "false" })
  isViewed: boolean;

  @Column("integer", { name: "type_quote", nullable: true, default: () => "0" })
  typeQuote: number | null;

  @Column("numeric", { name: "tax_total", nullable: true, default: () => "0" })
  taxTotal: string | null;

  @Column("timestamp without time zone", {
    name: "valid_until",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  validUntil: Date | null;

  @Column("character varying", {
    name: "truck_type",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  truckType: string | null;

  @Column("character varying", {
    name: "other_informations",
    nullable: true,
    length: 1000,
    default: () => "NULL::character varying",
  })
  otherInformations: string | null;

  @Column("numeric", {
    name: "weight",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  weight: string | null;

  @Column("text", { name: "reason_of_reject", nullable: true })
  reasonOfReject: string | null;

  @Column("text", { name: "loading_address", nullable: true })
  loadingAddress: string | null;

  @Column("timestamp without time zone", {
    name: "loading_datetime",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  loadingDatetime: Date | null;

  @Column("integer", { name: "truck_id", nullable: true })
  truckId: number | null;
}
