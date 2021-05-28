import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DtbPermission } from "./DtbPermission";
import { DtbUser } from "./DtbUser";
import { IhAdmin } from "./IhAdmin";

@Index("dtb_role_pkey", ["id"], { unique: true })
@Entity("dtb_role", { schema: "public" })
export class DtbRole {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "fullname",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  fullname: string | null;

  @Column("character varying", {
    name: "name",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  name: string | null;

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

  @ManyToMany(() => DtbPermission, (dtbPermission) => dtbPermission.dtbRoles)
  dtbPermissions: DtbPermission[];

  @ManyToMany(() => DtbUser, (dtbUser) => dtbUser.dtbRoles)
  @JoinTable({
    name: "dtb_user_role",
    joinColumns: [{ name: "role_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "user_id", referencedColumnName: "id" }],
    schema: "public",
  })
  dtbUsers: DtbUser[];

  @ManyToMany(() => IhAdmin, (ihAdmin) => ihAdmin.dtbRoles)
  ihAdmins: IhAdmin[];
}
