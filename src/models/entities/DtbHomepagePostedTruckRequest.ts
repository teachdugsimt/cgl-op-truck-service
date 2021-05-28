import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_homepage_posted_truck_request_pkey", ["id"], { unique: true })
@Entity("dtb_homepage_posted_truck_request", { schema: "public" })
export class DtbHomepagePostedTruckRequest {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("smallint", { name: "status", default: () => "0" })
  status: number;

  @Column("text", { name: "admin_note", nullable: true })
  adminNote: string | null;

  @Column("integer", { name: "type_of_trip", nullable: true })
  typeOfTrip: number | null;

  @Column("character varying", {
    name: "full_name",
    nullable: true,
    length: 300,
    default: () => "NULL::character varying",
  })
  fullName: string | null;

  @Column("character varying", {
    name: "contact_no",
    nullable: true,
    length: 30,
    default: () => "0",
  })
  contactNo: string | null;

  @Column("character varying", {
    name: "name_of_goods",
    nullable: true,
    length: 1000,
    default: () => "NULL::character varying",
  })
  nameOfGoods: string | null;

  @Column("integer", { name: "quantity", nullable: true })
  quantity: number | null;

  @Column("integer", { name: "unit_type", nullable: true })
  unitType: number | null;

  @Column("numeric", {
    name: "weight",
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  weight: string;

  @Column("text", { name: "from_address" })
  fromAddress: string;

  @Column("timestamp without time zone", {
    name: "from_datetime",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  fromDatetime: Date | null;

  @Column("double precision", {
    name: "from_latitude",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  fromLatitude: number | null;

  @Column("double precision", {
    name: "from_longitude",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  fromLongitude: number | null;

  @Column("numeric", {
    name: "expected_price",
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  expectedPrice: string;

  @Column("timestamp without time zone", {
    name: "valid_until",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  validUntil: Date | null;

  @Column("text", { name: "other_info", nullable: true })
  otherInfo: string | null;

  @Column("integer", { name: "selected_truck", default: () => "0" })
  selectedTruck: number;

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
