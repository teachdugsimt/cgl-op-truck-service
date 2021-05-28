import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DtbPermission } from "./DtbPermission";

@Index("dtb_route_pkey", ["id"], { unique: true })
@Entity("dtb_route", { schema: "public" })
export class DtbRoute {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "name",
    nullable: true,
    length: 50,
    default: () => "NULL::character varying",
  })
  name: string | null;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  description: string | null;

  @Column("character varying", {
    name: "route",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  route: string | null;

  @Column("smallint", { name: "status", default: () => "0" })
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

  @ManyToMany(() => DtbPermission, (dtbPermission) => dtbPermission.dtbRoutes)
  dtbPermissions: DtbPermission[];
}
