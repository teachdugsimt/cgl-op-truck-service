import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DtbShipment } from "./DtbShipment";
import { DtbWaybill } from "./DtbWaybill";
import { DtbWaybillHistory } from "./DtbWaybillHistory";

@Index("dtb_waybill_details_pkey", ["id"], { unique: true })
@Entity("dtb_waybill_details", { schema: "public" })
export class DtbWaybillDetails {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "quantity", nullable: true, default: () => "0" })
  quantity: number | null;

  @Column("integer", { name: "unit", default: () => "0" })
  unit: number;

  @Column("smallint", { name: "status" })
  status: number;

  @Column("numeric", {
    name: "total_weight",
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  totalWeight: string;

  @Column("character varying", {
    name: "note",
    nullable: true,
    length: 256,
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

  @ManyToOne(() => DtbShipment, (dtbShipment) => dtbShipment.dtbWaybillDetails)
  @JoinColumn([{ name: "shipment_id", referencedColumnName: "id" }])
  shipment: DtbShipment;

  @ManyToOne(() => DtbWaybill, (dtbWaybill) => dtbWaybill.dtbWaybillDetails)
  @JoinColumn([{ name: "waybill_id", referencedColumnName: "id" }])
  waybill: DtbWaybill;

  @OneToMany(
    () => DtbWaybillHistory,
    (dtbWaybillHistory) => dtbWaybillHistory.waybillDetail
  )
  dtbWaybillHistories: DtbWaybillHistory[];
}
