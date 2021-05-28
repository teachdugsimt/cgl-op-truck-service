import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DtbWaybillDetails } from "./DtbWaybillDetails";
import { DtbWaybill } from "./DtbWaybill";

@Index("dtb_waybill_history_pkey", ["id"], { unique: true })
@Entity("dtb_waybill_history", { schema: "public" })
export class DtbWaybillHistory {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "type", default: () => "0" })
  type: number;

  @Column("character varying", {
    name: "note",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  note: string | null;

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

  @Column("integer", { name: "user_id", nullable: true })
  userId: number | null;

  @ManyToOne(
    () => DtbWaybillDetails,
    (dtbWaybillDetails) => dtbWaybillDetails.dtbWaybillHistories
  )
  @JoinColumn([{ name: "waybill_detail_id", referencedColumnName: "id" }])
  waybillDetail: DtbWaybillDetails;

  @ManyToOne(() => DtbWaybill, (dtbWaybill) => dtbWaybill.dtbWaybillHistories)
  @JoinColumn([{ name: "waybill_id", referencedColumnName: "id" }])
  waybill: DtbWaybill;
}
