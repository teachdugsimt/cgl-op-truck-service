import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { DtbOrder } from "./DtbOrder";
// import { DtbUser } from "./DtbUser";
// import { DtbShipment } from "./DtbShipment";
// import { DtbTruck } from "./DtbTruck";
// import { DtbWaybillDetails } from "./DtbWaybillDetails";
// import { DtbWaybillHistory } from "./DtbWaybillHistory";

@Index("dtb_waybill_pkey", ["id"], { unique: true })
@Entity("dtb_waybill", { schema: "public" })
export class DtbWaybill {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @Column("numeric", { name: "total_weight", precision: 12, scale: 2 })
  totalWeight: string;

  @Column("smallint", { name: "status" })
  status: number;

  @Column("character varying", { name: "note", nullable: true, length: 512 })
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

  @Column("boolean", {
    name: "primary_driver_accepted",
    nullable: true,
    default: () => "false",
  })
  primaryDriverAccepted: boolean | null;

  @Column("boolean", {
    name: "secondary_driver_accepted",
    nullable: true,
    default: () => "false",
  })
  secondaryDriverAccepted: boolean | null;

  @Column("text", { name: "note_reject", nullable: true })
  noteReject: string | null;

  @Column("timestamp without time zone", {
    name: "loading_datetime",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  loadingDatetime: Date | null;

  @Column("timestamp without time zone", {
    name: "delivery_datetime",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  deliveryDatetime: Date | null;

  // @ManyToOne(() => DtbOrder, (dtbOrder) => dtbOrder.dtbWaybills)
  // @JoinColumn([{ name: "order_id", referencedColumnName: "id" }])
  // order: DtbOrder;

  // @ManyToOne(() => DtbUser, (dtbUser) => dtbUser.dtbWaybills)
  // @JoinColumn([{ name: "primary_driver_id", referencedColumnName: "id" }])
  // primaryDriver: DtbUser;

  // @ManyToOne(() => DtbUser, (dtbUser) => dtbUser.dtbWaybills2)
  // @JoinColumn([{ name: "reject_by_user_id", referencedColumnName: "id" }])
  // rejectByUser: DtbUser;

  // @ManyToOne(() => DtbUser, (dtbUser) => dtbUser.dtbWaybills3)
  // @JoinColumn([{ name: "secondary_driver_id", referencedColumnName: "id" }])
  // secondaryDriver: DtbUser;

  // @ManyToOne(() => DtbShipment, (dtbShipment) => dtbShipment.dtbWaybills)
  // @JoinColumn([{ name: "shipment_id", referencedColumnName: "id" }])
  // shipment: DtbShipment;

  // @ManyToOne(() => DtbTruck, (dtbTruck) => dtbTruck.dtbWaybills)
  // @JoinColumn([{ name: "truck_id", referencedColumnName: "id" }])
  // truck: DtbTruck;

  // @OneToMany(
  //   () => DtbWaybillDetails,
  //   (dtbWaybillDetails) => dtbWaybillDetails.waybill
  // )
  // dtbWaybillDetails: DtbWaybillDetails[];

  // @OneToMany(
  //   () => DtbWaybillHistory,
  //   (dtbWaybillHistory) => dtbWaybillHistory.waybill
  // )
  // dtbWaybillHistories: DtbWaybillHistory[];
}
