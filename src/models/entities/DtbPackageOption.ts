import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_package_option_pkey", ["id"], { unique: true })
@Entity("dtb_package_option", { schema: "public" })
export class DtbPackageOption {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "package_option_name", length: 255 })
  packageOptionName: string;

  @Column("integer", { name: "number_of_month", default: () => "0" })
  numberOfMonth: number;

  @Column("integer", { name: "additional_month", default: () => "0" })
  additionalMonth: number;

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

  @Column("integer", { name: "status", nullable: true, default: () => "0" })
  status: number | null;
}
