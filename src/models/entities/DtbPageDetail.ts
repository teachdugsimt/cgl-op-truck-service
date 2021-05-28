import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DtbCmsPages } from "./DtbCmsPages";

@Index("dtb_page_detail_pkey", ["id"], { unique: true })
@Entity("dtb_page_detail", { schema: "public" })
export class DtbPageDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "title" })
  title: string;

  @Column("character varying", { name: "web_language", length: 25 })
  webLanguage: string;

  @Column("text", { name: "content", nullable: true })
  content: string | null;

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

  @ManyToOne(() => DtbCmsPages, (dtbCmsPages) => dtbCmsPages.dtbPageDetails, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "page_id", referencedColumnName: "id" }])
  page: DtbCmsPages;
}
