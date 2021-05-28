import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_truck_price_request_details_pkey", ["id"], { unique: true })
@Entity("dtb_truck_price_request_details", { schema: "public" })
export class DtbTruckPriceRequestDetails {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "request_id", nullable: true, default: () => "0" })
  requestId: number | null;

  @Column("character varying", {
    name: "delivery_address",
    nullable: true,
    length: 200,
    default: () => "NULL::character varying",
  })
  deliveryAddress: string | null;

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
