import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DtbPermission } from "./DtbPermission";
import { DtbRole } from "./DtbRole";

@Index("ih_admin_pkey", ["id"], { unique: true })
@Entity("ih_admin", { schema: "public" })
export class IhAdmin {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "login_id", length: 254 })
  loginId: string;

  @Column("integer", { name: "role_id" })
  roleId: number;

  @Column("character varying", {
    name: "password",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  password: string | null;

  @Column("character varying", { name: "first_name", length: 25 })
  firstName: string;

  @Column("character varying", { name: "last_name", length: 25 })
  lastName: string;

  @Column("character varying", {
    name: "resetpassword_token",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  resetpasswordToken: string | null;

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

  @Column("boolean", { name: "account_lock", default: () => "false" })
  accountLock: boolean;

  @Column("boolean", { name: "is_deleted", default: () => "false" })
  isDeleted: boolean;

  @Column("integer", { name: "account_type", default: () => "1" })
  accountType: number;

  @ManyToMany(() => DtbPermission, (dtbPermission) => dtbPermission.ihAdmins)
  @JoinTable({
    name: "ih_admin_permission",
    joinColumns: [{ name: "admin_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "permission_id", referencedColumnName: "id" }],
    schema: "public",
  })
  dtbPermissions: DtbPermission[];

  @ManyToMany(() => DtbRole, (dtbRole) => dtbRole.ihAdmins)
  @JoinTable({
    name: "ih_admin_role",
    joinColumns: [{ name: "admin_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "role_id", referencedColumnName: "id" }],
    schema: "public",
  })
  dtbRoles: DtbRole[];
}
