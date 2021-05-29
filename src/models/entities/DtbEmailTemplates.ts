import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_email_templates_pkey", ["id"], { unique: true })
@Entity("dtb_email_templates", { schema: "public" })
export class DtbEmailTemplates {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "templates_code" })
  templatesCode: number;

  @Column("character varying", {
    name: "temp_name",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  tempName: string | null;

  @Column("text", { name: "temp_vars", nullable: true })
  tempVars: string | null;

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

  @Column("character varying", {
    name: "temp_title",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  tempTitle: string | null;

  @Column("character varying", {
    name: "temp_subject",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  tempSubject: string | null;

  @Column("text", { name: "temp_body", nullable: true })
  tempBody: string | null;
}