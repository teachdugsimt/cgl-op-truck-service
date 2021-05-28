import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_complaints_pkey", ["id"], { unique: true })
@Entity("dtb_complaints", { schema: "public" })
export class DtbComplaints {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "contract_id", default: () => "0" })
  contractId: number;

  @Column("smallint", { name: "issue_type", nullable: true })
  issueType: number | null;

  @Column("character varying", {
    name: "complaint",
    nullable: true,
    length: 1500,
    default: () => "NULL::character varying",
  })
  complaint: string | null;

  @Column("character varying", {
    name: "feedback",
    nullable: true,
    length: 1500,
    default: () => "NULL::character varying",
  })
  feedback: string | null;

  @Column("integer", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("smallint", { name: "user_role", nullable: true })
  userRole: number | null;

  @Column("smallint", { name: "status", default: () => "0" })
  status: number;

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
