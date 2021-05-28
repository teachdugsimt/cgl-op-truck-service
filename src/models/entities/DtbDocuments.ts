import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_documents_pkey", ["id"], { unique: true })
@Entity("dtb_documents", { schema: "public" })
export class DtbDocuments {
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

  @Column("integer", { name: "user_id", nullable: true, default: () => "0" })
  userId: number | null;

  @Column("character varying", {
    name: "object_type",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  objectType: string | null;

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
    name: "document_url",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  documentUrl: string | null;

  @Column("integer", { name: "truck_id", nullable: true })
  truckId: number | null;

  @Column("integer", { name: "waybill_id", nullable: true })
  waybillId: number | null;

  @Column("integer", { name: "contract_id", nullable: true })
  contractId: number | null;

  @Column("integer", { name: "waybill_details_id", nullable: true })
  waybillDetailsId: number | null;

  @Column("timestamp without time zone", {
    name: "expired_date",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  expiredDate: Date | null;
}
