import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_homepage_posted_truck_request_detail_pkey", ["id"], {
  unique: true,
})
@Entity("dtb_homepage_posted_truck_request_detail", { schema: "public" })
export class DtbHomepagePostedTruckRequestDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "request_id" })
  requestId: number;

  @Column("text", { name: "to_address" })
  toAddress: string;

  @Column("timestamp without time zone", {
    name: "to_datetime",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  toDatetime: Date | null;

  @Column("double precision", {
    name: "to_latitude",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  toLatitude: number | null;

  @Column("double precision", {
    name: "to_longitude",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  toLongitude: number | null;

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
