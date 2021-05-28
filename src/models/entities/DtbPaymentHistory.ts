import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DtbOrder } from "./DtbOrder";

@Index("dtb_payment_history_pkey", ["id"], { unique: true })
@Entity("dtb_payment_history", { schema: "public" })
export class DtbPaymentHistory {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("numeric", {
    name: "payment_fee",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  paymentFee: string | null;

  @Column("timestamp without time zone", {
    name: "payment_date",
    nullable: true,
  })
  paymentDate: Date | null;

  @Column("integer", { name: "payment_type", nullable: true })
  paymentType: number | null;

  @Column("integer", { name: "status", nullable: true })
  status: number | null;

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
    name: "gbp_reference_no",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  gbpReferenceNo: string | null;

  @Column("character varying", {
    name: "card_number",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  cardNumber: string | null;

  @Column("integer", { name: "payment_choice", default: () => "0" })
  paymentChoice: number;

  @Column("character varying", {
    name: "gbp_reference_no_carrier",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  gbpReferenceNoCarrier: string | null;

  @Column("timestamp without time zone", {
    name: "payment_date_carrier",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  paymentDateCarrier: Date | null;

  @Column("integer", { name: "transaction_id", nullable: true })
  transactionId: number | null;

  @Column("timestamp without time zone", {
    name: "payment_due_date",
    nullable: true,
  })
  paymentDueDate: Date | null;

  @ManyToOne(() => DtbOrder, (dtbOrder) => dtbOrder.dtbPaymentHistories)
  @JoinColumn([{ name: "contract_id", referencedColumnName: "id" }])
  contract: DtbOrder;
}
