import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_customer_marketing_pkey", ["id"], { unique: true })
@Entity("dtb_customer_marketing", { schema: "public" })
export class DtbCustomerMarketing {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "full_name", length: 254 })
  fullName: string;

  @Column("character varying", { name: "phone_number", length: 254 })
  phoneNumber: string;

  @Column("character varying", { name: "customer_type", length: 254 })
  customerType: string;

  @Column("character varying", { name: "company_name", length: 254 })
  companyName: string;

  @Column("character varying", {
    name: "no_of_truck",
    length: 254,
    default: () => "0",
  })
  noOfTruck: string;

  @Column("character varying", {
    name: "chanel",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  chanel: string | null;

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
