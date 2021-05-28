import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_admin_posted_truck_pkey", ["id"], { unique: true })
@Entity("dtb_admin_posted_truck", { schema: "public" })
export class DtbAdminPostedTruck {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "truck_type", length: 30 })
  truckType: string;

  @Column("integer", { name: "no_of_truck", default: () => "1" })
  noOfTruck: number;

  @Column("integer", { name: "cargo_type", default: () => "0" })
  cargoType: number;

  @Column("integer", { name: "unit_type", default: () => "0" })
  unitType: number;

  @Column("numeric", {
    name: "weight",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  weight: string | null;

  @Column("integer", {
    name: "loading_option",
    nullable: true,
    default: () => "0",
  })
  loadingOption: number | null;

  @Column("numeric", {
    name: "transport_fee",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  transportFee: string | null;

  @Column("integer", { name: "origin_zone", default: () => "0" })
  originZone: number;

  @Column("integer", { name: "destination_zone", default: () => "0" })
  destinationZone: number;

  @Column("timestamp without time zone", {
    name: "starting_time",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  startingTime: Date | null;

  @Column("timestamp without time zone", {
    name: "ending_time",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  endingTime: Date | null;

  @Column("timestamp without time zone", {
    name: "valid_time",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  validTime: Date | null;

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
