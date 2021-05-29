import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_province_pkey", ["id"], { unique: true })
@Entity("dtb_province", { schema: "public" })
export class DtbProvince {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "country_code",
    nullable: true,
    length: 25,
    default: () => "NULL::character varying",
  })
  countryCode: string | null;

  @Column("character varying", {
    name: "province_code",
    nullable: true,
    length: 25,
    default: () => "NULL::character varying",
  })
  provinceCode: string | null;

  @Column("character varying", {
    name: "global_name",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  globalName: string | null;

  @Column("character varying", {
    name: "province_name",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  provinceName: string | null;

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