import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_truck_job_user_details_pkey", ["id"], { unique: true })
@Entity("dtb_truck_job_user_details", { schema: "public" })
export class DtbTruckJobUserDetails {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "from_address", default: () => "''" })
  fromAddress: string;

  @Column("text", { name: "to_address", default: () => "''" })
  toAddress: string;

  @Column("numeric", {
    name: "weight",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  weight: string | null;

  @Column("numeric", {
    name: "price",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  price: string | null;

  @Column("character varying", {
    name: "truck_type",
    nullable: true,
    length: 256,
    default: () => "NULL::character varying",
  })
  truckType: string | null;

  @Column("integer", { name: "truck_job_user_id" })
  truckJobUserId: number;

  @Column("integer", { name: "type" })
  type: number;

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
