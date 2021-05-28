import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_issue_documents_pkey", ["id"], { unique: true })
@Entity("dtb_issue_documents", { schema: "public" })
export class DtbIssueDocuments {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "document_name",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  documentName: string | null;

  @Column("character varying", {
    name: "document_type",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  documentType: string | null;

  @Column("integer", { name: "user_id", default: () => "0" })
  userId: number;

  @Column("integer", { name: "issue_id", default: () => "0" })
  issueId: number;

  @Column("character varying", {
    name: "document_url",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  documentUrl: string | null;

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
