import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_driver_pkey", ["id"], { unique: true })
@Entity("dtb_driver", { schema: "public" })
export class DtbDriver {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "email",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  email: string | null;

  @Column("character varying", {
    name: "password",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  password: string | null;

  @Column("character varying", {
    name: "fullname",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  fullname: string | null;

  @Column("boolean", { name: "enabled", default: () => "false" })
  enabled: boolean;

  @Column("character varying", {
    name: "equipment",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  equipment: string | null;

  @Column("character varying", {
    name: "license_number",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  licenseNumber: string | null;

  @Column("character varying", {
    name: "license_number_document",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  licenseNumberDocument: string | null;

  @Column("boolean", { name: "multiple_pickups", default: () => "false" })
  multiplePickups: boolean;

  @Column("character varying", {
    name: "phone_number",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  phoneNumber: string | null;

  @Column("character varying", {
    name: "platform",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  platform: string | null;

  @Column("boolean", { name: "receive_offers", default: () => "false" })
  receiveOffers: boolean;

  @Column("integer", { name: "carrier_id", default: () => "0" })
  carrierId: number;

  @Column("character varying", {
    name: "background_image",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  backgroundImage: string | null;

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
