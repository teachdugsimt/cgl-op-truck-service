import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_company_external_pkey", ["id"], { unique: true })
@Entity("dtb_company_external", { schema: "public" })
export class DtbCompanyExternal {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "company_name",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  companyName: string | null;

  @Column("character varying", {
    name: "business_license_number",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  businessLicenseNumber: string | null;

  @Column("text", {
    name: "company_authorized_person",
    nullable: true,
    default: () => "NULL::character varying",
  })
  companyAuthorizedPerson: string | null;

  @Column("character varying", {
    name: "company_phone_number",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  companyPhoneNumber: string | null;

  @Column("character varying", {
    name: "registered_address",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  registeredAddress: string | null;

  @Column("character varying", {
    name: "transaction_office",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  transactionOffice: string | null;

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
