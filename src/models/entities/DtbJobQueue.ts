import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_job_queue_pkey", ["id"], { unique: true })
@Entity("dtb_job_queue", { schema: "public" })
export class DtbJobQueue {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "job_waybill_id", nullable: true })
  jobWaybillId: number | null;

  @Column("character varying", {
    name: "note",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  note: string | null;

  @Column("smallint", { name: "type", default: () => "0" })
  type: number;

  @Column("integer", { name: "status", default: () => "0" })
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

  @Column("text", { name: "language", nullable: true, default: () => "'en'" })
  language: string | null;

  @Column("integer", { name: "job_contract_id", nullable: true })
  jobContractId: number | null;
}
