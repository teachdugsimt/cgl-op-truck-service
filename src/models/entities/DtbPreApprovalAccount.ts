import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_pre_approval_account_pkey", ["id"], { unique: true })
@Entity("dtb_pre_approval_account", { schema: "public" })
export class DtbPreApprovalAccount {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "role" })
  role: number;

  @Column("character varying", { name: "phone_number", length: 254 })
  phoneNumber: string;

  @Column("character varying", { name: "full_name", length: 254 })
  fullName: string;

  @Column("character varying", { name: "business_license_number", length: 254 })
  businessLicenseNumber: string;

  @Column("character varying", {
    name: "legal_representative",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  legalRepresentative: string | null;

  @Column("character varying", {
    name: "address",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  address: string | null;

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
}
