import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DtbPageDetail } from "./DtbPageDetail";

@Index("dtb_cms_pages_pkey", ["id"], { unique: true })
@Entity("dtb_cms_pages", { schema: "public" })
export class DtbCmsPages {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "page_name",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  pageName: string | null;

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

  @Column("character varying", { name: "url", nullable: true, length: 255 })
  url: string | null;

  @OneToMany(() => DtbPageDetail, (dtbPageDetail) => dtbPageDetail.page)
  dtbPageDetails: DtbPageDetail[];
}
