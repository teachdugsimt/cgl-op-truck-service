import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DtbUser } from "./DtbUser";
import { DtbTruckPhoto } from "./DtbTruckPhoto";
import { DtbWaybill } from "./DtbWaybill";

@Index("dtb_truck_pkey", ["id"], { unique: true })
@Entity("dtb_truck", { schema: "public" })
export class DtbTruck {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "name",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  name: string | null;

  @Column("integer", { name: "carrier_id", default: () => "0" })
  carrierId: number;

  @Column("character varying", {
    name: "insurance_policy_document",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  insurancePolicyDocument: string | null;

  @Column("character varying", {
    name: "receipt_annual_document",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  receiptAnnualDocument: string | null;

  @Column("character varying", {
    name: "registration_number",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  registrationNumber: string | null;

  @Column("character varying", {
    name: "registration_number_document",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  registrationNumberDocument: string | null;

  @Column("character varying", {
    name: "technical_logbook_document",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  technicalLogbookDocument: string | null;

  @Column("double precision", {
    name: "loading_weight",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  loadingWeight: number | null;

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

  @Column("integer", { name: "truck_type", default: () => "0" })
  truckType: number;

  @Column("integer", { name: "approve_status", default: () => "0" })
  approveStatus: number | string;

  @Column("timestamp without time zone", {
    name: "approve_date",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  approveDate: Date | null;

  @Column("character varying", {
    name: "vehicle_registration_year",
    nullable: true,
    length: 50,
  })
  vehicleRegistrationYear: string | null;

  @Column("character varying", {
    name: "note",
    nullable: true,
    length: 254,
    default: () => "''",
  })
  note: string | null;

  @Column("character varying", {
    name: "type_of_cargo",
    nullable: true,
    length: 250,
  })
  typeOfCargo: string | null;

  @Column("integer", { name: "group_truck_type", nullable: true })
  groupTruckType: number | null;

  @Column("timestamp without time zone", {
    name: "dlt_sticker_expired_date",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  dltStickerExpiredDate: Date | null;

  @Column("boolean", {
    name: "is_tipper",
    nullable: true,
    default: () => "false",
  })
  isTipper: boolean | null;

  @Column("character varying", {
    name: "stall_height",
    nullable: true,
    length: 10,
    default: () => "NULL::character varying",
  })
  stallHeight: string | null;

  @ManyToMany(() => DtbUser, (dtbUser) => dtbUser.dtbTrucks)
  dtbUsers: DtbUser[];

  @OneToMany(() => DtbTruckPhoto, (dtbTruckPhoto) => dtbTruckPhoto.truck)
  dtbTruckPhotos: DtbTruckPhoto[];

  @OneToMany(() => DtbWaybill, (dtbWaybill) => dtbWaybill.truck)
  dtbWaybills: DtbWaybill[];
}
