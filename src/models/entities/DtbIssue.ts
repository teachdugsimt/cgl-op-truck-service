import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_issue_pkey", ["id"], { unique: true })
@Entity("dtb_issue", { schema: "public" })
export class DtbIssue {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("smallint", { name: "issue_type" })
  issueType: number;

  @Column("character varying", {
    name: "issue_note",
    nullable: true,
    length: 2000,
    default: () => "NULL::character varying",
  })
  issueNote: string | null;

  @Column("smallint", { name: "issue_status", default: () => "0" })
  issueStatus: number;

  @Column("integer", { name: "user_id" })
  userId: number;

  @Column("integer", { name: "carrier_id" })
  carrierId: number;

  @Column("integer", { name: "waybill_id", nullable: true })
  waybillId: number | null;

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
    name: "feedback",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  feedback: string | null;
}
