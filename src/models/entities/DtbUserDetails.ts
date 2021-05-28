import { Column, Entity } from "typeorm";

@Entity("dtb_user_details", { schema: "public" })
export class DtbUserDetails {
  @Column("integer", { name: "id" })
  id: number;

  @Column("character varying", {
    name: "authority_license_document",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  authorityLicenseDocument: string | null;

  @Column("character varying", {
    name: "business_registration_document",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  businessRegistrationDocument: string | null;

  @Column("character varying", {
    name: "insurance_certificate_document",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  insuranceCertificateDocument: string | null;

  @Column("character varying", {
    name: "attached_document",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  attachedDocument: string | null;
}
