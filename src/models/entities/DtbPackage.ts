import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_package_pkey", ["id"], { unique: true })
@Entity("dtb_package", { schema: "public" })
export class DtbPackage {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "package_name",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  packageName: string | null;

  @Column("integer", {
    name: "number_of_truck",
    nullable: true,
    default: () => "0",
  })
  numberOfTruck: number | null;

  @Column("numeric", { name: "price", nullable: true, default: () => "0" })
  price: string | null;

  @Column("timestamp without time zone", {
    name: "sell_expire_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  sellExpireDate: Date | null;

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
