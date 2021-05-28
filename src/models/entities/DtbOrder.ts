import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DtbCargoPhoto } from "./DtbCargoPhoto";
import { DtbPaymentHistory } from "./DtbPaymentHistory";
import { DtbWaybill } from "./DtbWaybill";

@Index("dtb_order_pkey", ["id"], { unique: true })
@Entity("dtb_order", { schema: "public" })
export class DtbOrder {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "code_id",
    nullable: true,
    length: 20,
    default: () => "NULL::character varying",
  })
  codeId: string | null;

  @Column("smallint", { name: "status" })
  status: number;

  @Column("numeric", { name: "offered_total", precision: 12, scale: 2 })
  offeredTotal: string;

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

  @Column("integer", { name: "shipper_id" })
  shipperId: number;

  @Column("integer", { name: "win_carrier_id", nullable: true })
  winCarrierId: number | null;

  @Column("integer", { name: "win_quotation_id", nullable: true })
  winQuotationId: number | null;

  @Column("character varying", {
    name: "title",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  title: string | null;

  @Column("integer", {
    name: "quotation_type",
    nullable: true,
    default: () => "0",
  })
  quotationType: number | null;

  @Column("timestamp without time zone", {
    name: "valid_until",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  validUntil: Date | null;

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

  @Column("integer", { name: "carrier_offer_id", nullable: true })
  carrierOfferId: number | null;

  @Column("integer", { name: "disregard", nullable: true, default: () => "0" })
  disregard: number | null;

  @Column("integer", { name: "freight_offer_id", nullable: true })
  freightOfferId: number | null;

  @Column("integer", { name: "type", nullable: true, default: () => "0" })
  type: number | null;

  @Column("integer", { name: "type_of_cargo", default: () => "'-1'" })
  typeOfCargo: number;

  @Column("character varying", {
    name: "name_of_cargo",
    length: 256,
    default: () => "''",
  })
  nameOfCargo: string;

  @Column("integer", { name: "quantity", default: () => "0" })
  quantity: number;

  @Column("integer", { name: "unit", default: () => "1" })
  unit: number;

  @Column("numeric", {
    name: "total_weight",
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  totalWeight: string;

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

  @Column("character varying", {
    name: "truck_type",
    nullable: true,
    length: 30,
    default: () => "'-1'",
  })
  truckType: string | null;

  @Column("integer", {
    name: "truck_sharing",
    nullable: true,
    default: () => "0",
  })
  truckSharing: number | null;

  @Column("character varying", {
    name: "handling_instruction",
    nullable: true,
    length: 512,
    default: () => "NULL::character varying",
  })
  handlingInstruction: string | null;

  @Column("timestamp without time zone", {
    name: "loading_datetime",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  loadingDatetime: Date | null;

  @Column("character varying", {
    name: "loading_address",
    nullable: true,
    length: 256,
    default: () => "NULL::character varying",
  })
  loadingAddress: string | null;

  @Column("double precision", {
    name: "loading_longitude",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  loadingLongitude: number | null;

  @Column("double precision", {
    name: "loading_latitude",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  loadingLatitude: number | null;

  @Column("character varying", {
    name: "loading_contact_name",
    nullable: true,
    length: 256,
    default: () => "NULL::character varying",
  })
  loadingContactName: string | null;

  @Column("character varying", {
    name: "loading_contact_phone",
    nullable: true,
    length: 256,
    default: () => "NULL::character varying",
  })
  loadingContactPhone: string | null;

  @Column("numeric", {
    name: "winner_price",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  winnerPrice: string | null;

  @Column("smallint", { name: "payment_status", default: () => "0" })
  paymentStatus: number;

  @Column("smallint", { name: "payment_method", default: () => "0" })
  paymentMethod: number;

  @Column("numeric", {
    name: "tax_number",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  taxNumber: string | null;

  @Column("numeric", {
    name: "tax_price",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  taxPrice: string | null;

  @Column("numeric", {
    name: "total_price",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  totalPrice: string | null;

  @Column("smallint", { name: "payment_status_carrier", default: () => "0" })
  paymentStatusCarrier: number;

  @Column("boolean", { name: "required_insurance", default: () => "false" })
  requiredInsurance: boolean;

  @Column("numeric", {
    name: "cargo_price",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  cargoPrice: string | null;

  @Column("text", { name: "complain_note", nullable: true })
  complainNote: string | null;

  @Column("timestamp without time zone", {
    name: "accepted_date",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  acceptedDate: Date | null;

  @Column("timestamp without time zone", {
    name: "finish_time",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  finishTime: Date | null;

  @Column("character varying", {
    name: "loading_province",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  loadingProvince: string | null;

  @Column("character varying", {
    name: "loading_district",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  loadingDistrict: string | null;

  @Column("character varying", {
    name: "total_distance",
    nullable: true,
    length: 254,
    default: () => "0",
  })
  totalDistance: string | null;

  @Column("boolean", { name: "check_loading_service", default: () => "false" })
  checkLoadingService: boolean;

  @Column("boolean", {
    name: "check_unloading_service",
    default: () => "false",
  })
  checkUnloadingService: boolean;

  @Column("character varying", {
    name: "recommend_carrier_id",
    nullable: true,
    length: 250,
    default: () => "NULL::character varying",
  })
  recommendCarrierId: string | null;

  @Column("character varying", {
    name: "recommend_truck_id",
    nullable: true,
    length: 250,
    default: () => "NULL::character varying",
  })
  recommendTruckId: string | null;

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

  @Column("integer", { name: "loading_province_id", nullable: true })
  loadingProvinceId: number | null;

  @Column("integer", { name: "loading_district_id", nullable: true })
  loadingDistrictId: number | null;

  @Column("text", { name: "reason_of_reject", nullable: true })
  reasonOfReject: string | null;

  @Column("integer", { name: "parent_order_id", nullable: true })
  parentOrderId: number | null;

  @Column("boolean", {
    name: "is_single_trip",
    nullable: true,
    default: () => "false",
  })
  isSingleTrip: boolean | null;

  @Column("numeric", {
    name: "carrier_price",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  carrierPrice: string | null;

  @Column("integer", { name: "truck_amount", nullable: true })
  truckAmount: number | null;

  @Column("integer", { name: "platform", nullable: true, default: () => "0" })
  platform: number | null;

  @OneToMany(() => DtbCargoPhoto, (dtbCargoPhoto) => dtbCargoPhoto.order)
  dtbCargoPhotos: DtbCargoPhoto[];

  @OneToMany(
    () => DtbPaymentHistory,
    (dtbPaymentHistory) => dtbPaymentHistory.contract
  )
  dtbPaymentHistories: DtbPaymentHistory[];

  @OneToMany(() => DtbWaybill, (dtbWaybill) => dtbWaybill.order)
  dtbWaybills: DtbWaybill[];
}
