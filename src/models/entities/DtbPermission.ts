import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DtbRole } from "./DtbRole";
import { DtbRoute } from "./DtbRoute";
import { DtbUser } from "./DtbUser";
import { IhAdmin } from "./IhAdmin";

@Index("dtb_permission_pkey", ["id"], { unique: true })
@Entity("dtb_permission", { schema: "public" })
export class DtbPermission {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("character varying", { name: "type", length: 255 })
  type: string;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  description: string | null;

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

  @ManyToMany(() => DtbRole, (dtbRole) => dtbRole.dtbPermissions)
  @JoinTable({
    name: "dtb_role_permission",
    joinColumns: [{ name: "permission_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "role_id", referencedColumnName: "id" }],
    schema: "public",
  })
  dtbRoles: DtbRole[];

  @ManyToMany(() => DtbRoute, (dtbRoute) => dtbRoute.dtbPermissions)
  @JoinTable({
    name: "dtb_route_permission",
    joinColumns: [{ name: "permission_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "route_id", referencedColumnName: "id" }],
    schema: "public",
  })
  dtbRoutes: DtbRoute[];

  @ManyToMany(() => DtbUser, (dtbUser) => dtbUser.dtbPermissions)
  @JoinTable({
    name: "dtb_user_permission",
    joinColumns: [{ name: "permission_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "user_id", referencedColumnName: "id" }],
    schema: "public",
  })
  dtbUsers: DtbUser[];

  @ManyToMany(() => IhAdmin, (ihAdmin) => ihAdmin.dtbPermissions)
  ihAdmins: IhAdmin[];
}
