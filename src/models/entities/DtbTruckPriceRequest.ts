import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_truck_price_request_pkey", ["id"], { unique: true })
@Entity("dtb_truck_price_request", { schema: "public" })
export class DtbTruckPriceRequest {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", {
    name: "truck_type_id",
    nullable: true,
    default: () => "0",
  })
  truckTypeId: number | null;

  @Column("character varying", {
    name: "pick_up_address",
    nullable: true,
    length: 200,
    default: () => "NULL::character varying",
  })
  pickUpAddress: string | null;

  @Column("numeric", {
    name: "total_charge",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  totalCharge: string | null;

  @Column("character varying", {
    name: "full_name",
    nullable: true,
    length: 200,
    default: () => "NULL::character varying",
  })
  fullName: string | null;

  @Column("character varying", {
    name: "phone_number",
    nullable: true,
    length: 50,
    default: () => "NULL::character varying",
  })
  phoneNumber: string | null;

  @Column("character varying", {
    name: "name_of_goods",
    nullable: true,
    length: 200,
    default: () => "NULL::character varying",
  })
  nameOfGoods: string | null;

  @Column("character varying", {
    name: "line_id",
    nullable: true,
    length: 30,
    default: () => "NULL::character varying",
  })
  lineId: string | null;

  @Column("character varying", {
    name: "other_information",
    nullable: true,
    length: 1000,
    default: () => "NULL::character varying",
  })
  otherInformation: string | null;

  @Column("smallint", { name: "status", default: () => "0" })
  status: number;

  @Column("character varying", {
    name: "admin_note",
    nullable: true,
    length: 1000,
    default: () => "NULL::character varying",
  })
  adminNote: string | null;

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
