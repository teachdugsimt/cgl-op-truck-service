import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("ih_route_pkey", ["id"], { unique: true })
@Entity("ih_route", { schema: "public" })
export class IhRoute {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "page_name",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  pageName: string | null;

  @Column("character varying", {
    name: "url",
    nullable: true,
    length: 255,
    default: () => "NULL::character varying",
  })
  url: string | null;

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

  @Column("character varying", {
    name: "page_name_th",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  pageNameTh: string | null;
}
