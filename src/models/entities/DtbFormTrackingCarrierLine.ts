import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_form_tracking_carrier_line_pkey", ["id"], { unique: true })
@Entity("dtb_form_tracking_carrier_line", { schema: "public" })
export class DtbFormTrackingCarrierLine {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "full_name", length: 30 })
  fullName: string;

  @Column("character varying", {
    name: "company_name",
    nullable: true,
    length: 30,
    default: () => "NULL::character varying",
  })
  companyName: string | null;

  @Column("character varying", { name: "number_contact", length: 30 })
  numberContact: string;

  @Column("character varying", {
    name: "id_type_of_trucks",
    nullable: true,
    length: 100,
    default: () => "NULL::character varying",
  })
  idTypeOfTrucks: string | null;

  @Column("integer", { name: "id_type_of_goods" })
  idTypeOfGoods: number;

  @Column("integer", { name: "no_of_truck" })
  noOfTruck: number;

  @Column("numeric", { name: "weight", precision: 12, scale: 2 })
  weight: string;

  @Column("character varying", { name: "province", length: 256 })
  province: string;

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
