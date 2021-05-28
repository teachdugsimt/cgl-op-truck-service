import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_mobile_notification_pkey", ["id"], { unique: true })
@Entity("dtb_mobile_notification", { schema: "public" })
export class DtbMobileNotification {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "title",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  title: string | null;

  @Column("character varying", {
    name: "summary",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  summary: string | null;

  @Column("integer", { name: "type", nullable: true, default: () => "0" })
  type: number | null;

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

  @Column("character varying", {
    name: "title_th",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  titleTh: string | null;

  @Column("character varying", {
    name: "summary_th",
    nullable: true,
    length: 254,
    default: () => "NULL::character varying",
  })
  summaryTh: string | null;

  @Column("text", { name: "content_th", nullable: true })
  contentTh: string | null;
}
