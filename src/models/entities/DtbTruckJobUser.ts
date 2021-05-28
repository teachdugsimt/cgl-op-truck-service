import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_truck_job_user_pkey", ["id"], { unique: true })
@Entity("dtb_truck_job_user", { schema: "public" })
export class DtbTruckJobUser {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "phone_number",
    length: 254,
    default: () => "''",
  })
  phoneNumber: string;

  @Column("character varying", {
    name: "full_name",
    length: 254,
    default: () => "''",
  })
  fullName: string;

  @Column("numeric", {
    name: "expected_price",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  expectedPrice: string | null;

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

  @Column("integer", { name: "type", default: () => "1" })
  type: number;
}
