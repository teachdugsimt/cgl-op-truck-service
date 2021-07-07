import {
  Column, Entity, Index, PrimaryGeneratedColumn, BeforeInsert,
  BeforeUpdate
} from "typeorm";
@Index("truck_pkey", ["id"], { unique: true })
@Entity("truck", { schema: "public" })
export class DtbTruck {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "name",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  name: string | null;

  @Column("integer", { name: "carrier_id", default: () => "0" })
  carrierId: number;

  @Column("character varying", {
    name: "registration_number",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  registrationNumber: string | null;

  @Column("double precision", {
    name: "loading_weight",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  loadingWeight: number | null;

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

  @Column("integer", { name: "truck_type", default: () => "0" })
  truckType: number;

  @Column("integer", { name: "approve_status", default: () => "'INACTIVE'::status_enum" })
  approveStatus: number | string;

  @Column("timestamp without time zone", {
    name: "approve_date",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  approveDate: Date | null;

  @Column("integer", { name: "group_truck_type", nullable: true })
  groupTruckType: number | null;

  @Column("boolean", {
    name: "is_tipper",
    nullable: true,
    default: () => "false",
  })
  isTipper: boolean | null;

  @Column("character varying", {
    name: "stall_height",
    nullable: true,
    length: 10,
    default: () => "NULL::character varying",
  })
  stallHeight: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  addUpdateTime() {
    this.updatedAt = new Date()
  }

  @BeforeInsert()
  addInsertTime() {
    this.createdAt = new Date()
  }
}
