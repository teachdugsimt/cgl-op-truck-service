import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_sub_district_pkey", ["id"], { unique: true })
@Entity("dtb_sub_district", { schema: "public" })
export class DtbSubDistrict {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "district_id", default: () => "0" })
  districtId: number;

  @Column("character varying", {
    name: "sub_district_name",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  subDistrictName: string | null;

  @Column("character varying", {
    name: "global_name",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  globalName: string | null;

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
