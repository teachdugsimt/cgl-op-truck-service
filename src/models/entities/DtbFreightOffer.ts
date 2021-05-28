import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_freight_offer_pkey", ["id"], { unique: true })
@Entity("dtb_freight_offer", { schema: "public" })
export class DtbFreightOffer {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "loading_address",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  loadingAddress: string | null;

  @Column("timestamp without time zone", {
    name: "loading_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  loadingDate: Date | null;

  @Column("character varying", {
    name: "delivery_address",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  deliveryAddress: string | null;

  @Column("timestamp without time zone", {
    name: "delivery_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  deliveryDate: Date | null;

  @Column("numeric", {
    name: "weight",
    precision: 10,
    scale: 2,
    default: () => "0",
  })
  weight: string;

  @Column("integer", {
    name: "type_of_price",
    nullable: true,
    default: () => "0",
  })
  typeOfPrice: number | null;

  @Column("numeric", {
    name: "price",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  price: string | null;

  @Column("timestamp without time zone", {
    name: "valid_until",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  validUntil: Date | null;

  @Column("integer", { name: "carrier_id" })
  carrierId: number;

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

  @Column("integer", { name: "status", nullable: true, default: () => "0" })
  status: number | null;

  @Column("integer", { name: "truck_id", nullable: true, default: () => "0" })
  truckId: number | null;

  @Column("text", { name: "cancel_note", nullable: true })
  cancelNote: string | null;

  @Column("integer", { name: "cancel_user", nullable: true })
  cancelUser: number | null;

  @Column("timestamp without time zone", {
    name: "cancel_time",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  cancelTime: Date | null;

  @Column("numeric", {
    name: "length",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  length: string | null;

  @Column("numeric", {
    name: "width",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  width: string | null;

  @Column("numeric", {
    name: "height",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  height: string | null;

  @Column("double precision", {
    name: "longitude_org",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  longitudeOrg: number | null;

  @Column("double precision", {
    name: "latitude_org",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  latitudeOrg: number | null;

  @Column("double precision", {
    name: "longitude_dest",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  longitudeDest: number | null;

  @Column("double precision", {
    name: "latitude_dest",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  latitudeDest: number | null;

  @Column("integer", {
    name: "truck_sharing",
    nullable: true,
    default: () => "0",
  })
  truckSharing: number | null;

  @Column("character varying", {
    name: "loading_province",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  loadingProvince: string | null;

  @Column("character varying", {
    name: "delivery_province",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  deliveryProvince: string | null;

  @Column("character varying", {
    name: "loading_district",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  loadingDistrict: string | null;

  @Column("character varying", {
    name: "delivery_district",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  deliveryDistrict: string | null;

  @Column("character varying", {
    name: "recommend_shipper_id",
    nullable: true,
    length: 250,
    default: () => "NULL::character varying",
  })
  recommendShipperId: string | null;

  @Column("character varying", {
    name: "loading_address_en",
    nullable: true,
    length: 256,
  })
  loadingAddressEn: string | null;

  @Column("character varying", {
    name: "loading_address_th",
    nullable: true,
    length: 256,
  })
  loadingAddressTh: string | null;

  @Column("character varying", {
    name: "delivery_address_en",
    nullable: true,
    length: 256,
  })
  deliveryAddressEn: string | null;

  @Column("character varying", {
    name: "delivery_address_th",
    nullable: true,
    length: 256,
  })
  deliveryAddressTh: string | null;

  @Column("integer", { name: "loading_province_id", nullable: true })
  loadingProvinceId: number | null;

  @Column("integer", { name: "loading_district_id", nullable: true })
  loadingDistrictId: number | null;

  @Column("integer", { name: "delivery_province_id", nullable: true })
  deliveryProvinceId: number | null;

  @Column("integer", { name: "delivery_district_id", nullable: true })
  deliveryDistrictId: number | null;

  @Column("character varying", {
    name: "truck_type",
    length: 255,
    default: () => "''",
  })
  truckType: string;
}
