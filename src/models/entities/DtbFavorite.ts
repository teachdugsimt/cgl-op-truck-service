import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_favorite_pkey", ["id"], { unique: true })
@Entity("dtb_favorite", { schema: "public" })
export class DtbFavorite {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "user_id", default: () => "0" })
  userId: number;

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

  @Column("character varying", {
    name: "departure_address",
    nullable: true,
    length: 255,
  })
  departureAddress: string | null;

  @Column("character varying", { name: "departure_latitude", length: 255 })
  departureLatitude: string;

  @Column("character varying", { name: "departure_longitude", length: 255 })
  departureLongitude: string;

  @Column("character varying", { name: "destination_address", length: 255 })
  destinationAddress: string;

  @Column("character varying", { name: "destination_latitude", length: 255 })
  destinationLatitude: string;

  @Column("character varying", { name: "destination_longitude", length: 255 })
  destinationLongitude: string;

  @Column("character varying", {
    name: "total_distance",
    nullable: true,
    length: 255,
    default: () => "0",
  })
  totalDistance: string | null;

  @Column("integer", { name: "truck_id", nullable: true })
  truckId: number | null;

  @Column("character varying", {
    name: "from_province",
    nullable: true,
    length: 250,
  })
  fromProvince: string | null;

  @Column("character varying", {
    name: "from_district",
    nullable: true,
    length: 250,
  })
  fromDistrict: string | null;

  @Column("character varying", {
    name: "to_province",
    nullable: true,
    length: 250,
  })
  toProvince: string | null;

  @Column("character varying", {
    name: "to_district",
    nullable: true,
    length: 250,
  })
  toDistrict: string | null;

  @Column("boolean", { name: "created_by_admin", default: () => "false" })
  createdByAdmin: boolean;

  @Column("character varying", {
    name: "departure_address_en",
    nullable: true,
    length: 256,
  })
  departureAddressEn: string | null;

  @Column("character varying", {
    name: "departure_address_th",
    nullable: true,
    length: 256,
  })
  departureAddressTh: string | null;

  @Column("character varying", {
    name: "destination_address_en",
    nullable: true,
    length: 256,
  })
  destinationAddressEn: string | null;

  @Column("character varying", {
    name: "destination_address_th",
    nullable: true,
    length: 256,
  })
  destinationAddressTh: string | null;
}
