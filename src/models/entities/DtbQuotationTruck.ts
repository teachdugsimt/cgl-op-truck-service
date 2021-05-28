import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_quotation_truck_pkey", ["id"], { unique: true })
@Entity("dtb_quotation_truck", { schema: "public" })
export class DtbQuotationTruck {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "order_id" })
  orderId: number;

  @Column("integer", { name: "truck_id" })
  truckId: number;

  @Column("integer", { name: "status", nullable: true, default: () => "0" })
  status: number | null;

  @Column("timestamp without time zone", {
    name: "booking_datetime",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  bookingDatetime: Date | null;

  @Column("timestamp without time zone", {
    name: "action_datetime",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  actionDatetime: Date | null;

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
