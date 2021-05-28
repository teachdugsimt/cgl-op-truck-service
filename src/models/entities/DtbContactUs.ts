import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_contact_us_pkey", ["id"], { unique: true })
@Entity("dtb_contact_us", { schema: "public" })
export class DtbContactUs {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "full_name", length: 25 })
  fullName: string;

  @Column("character varying", {
    name: "job_title",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  jobTitle: string | null;

  @Column("character varying", {
    name: "company",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  company: string | null;

  @Column("character varying", { name: "email", length: 30 })
  email: string;

  @Column("character varying", {
    name: "phone_number",
    nullable: true,
    length: 255,
  })
  phoneNumber: string | null;

  @Column("character varying", {
    name: "contact_content",
    nullable: true,
    length: 255,
  })
  contactContent: string | null;

  @Column("character varying", {
    name: "details_request",
    nullable: true,
    length: 1000,
  })
  detailsRequest: string | null;

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

  @Column("smallint", { name: "status", default: () => "0" })
  status: number;

  @Column("character varying", {
    name: "note",
    nullable: true,
    length: 1000,
    default: () => "NULL::character varying",
  })
  note: string | null;
}
