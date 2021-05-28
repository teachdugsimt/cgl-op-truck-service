import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_quotation_shipment_pkey", ["id"], { unique: true })
@Entity("dtb_quotation_shipment", { schema: "public" })
export class DtbQuotationShipment {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "quotation_id" })
  quotationId: number;

  @Column("integer", { name: "shipment_id" })
  shipmentId: number;

  @Column("text", { name: "delivery_address", nullable: true })
  deliveryAddress: string | null;

  @Column("timestamp without time zone", {
    name: "delivery_datetime",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  deliveryDatetime: Date | null;

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
