import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_customer_pkey", ["id"], { unique: true })
@Entity("dtb_customer", { schema: "public" })
export class DtbCustomer {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "login_id", length: 254 })
  loginId: string;

  @Column("character varying", {
    name: "password",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  password: string | null;

  @Column("smallint", { name: "status" })
  status: number;

  @Column("character varying", { name: "first_name", length: 25 })
  firstName: string;

  @Column("character varying", { name: "last_name", length: 25 })
  lastName: string;

  @Column("character varying", { name: "first_name_kana", length: 25 })
  firstNameKana: string;

  @Column("character varying", { name: "last_name_kana", length: 25 })
  lastNameKana: string;

  @Column("character varying", { name: "phone_number", length: 12 })
  phoneNumber: string;

  @Column("character varying", { name: "prefecture", length: 50 })
  prefecture: string;

  @Column("character varying", { name: "address1", length: 50 })
  address1: string;

  @Column("character varying", { name: "address2", length: 50 })
  address2: string;

  @Column("smallint", { name: "mail_delivery_flag", default: () => "1" })
  mailDeliveryFlag: number;

  @Column("character varying", {
    name: "memo",
    nullable: true,
    length: 512,
    default: () => "NULL::character varying",
  })
  memo: string | null;

  @Column("timestamp without time zone", {
    name: "registration_date",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  registrationDate: Date | null;

  @Column("character varying", {
    name: "resetpassword_token",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  resetpasswordToken: string | null;

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
