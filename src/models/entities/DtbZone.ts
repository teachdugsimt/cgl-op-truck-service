import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_zone_pkey", ["id"], { unique: true })
@Entity("dtb_zone", { schema: "public" })
export class DtbZone {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "user_id", nullable: true, default: () => "0" })
  userId: number | null;

  @Column("integer", { name: "user_role", nullable: true, default: () => "0" })
  userRole: number | null;

  @Column("character varying", {
    name: "zone_name",
    nullable: true,
    length: 350,
    default: () => "NULL::character varying",
  })
  zoneName: string | null;

  @Column("character varying", {
    name: "province_ids",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  provinceIds: string | null;

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

  @Column("integer", { name: "truck_id", nullable: true })
  truckId: number | null;

  @Column("boolean", { name: "created_by_admin", default: () => "false" })
  createdByAdmin: boolean;

  @Column("integer", { name: "zone_id", default: () => "0" })
  zoneId: number;
}
