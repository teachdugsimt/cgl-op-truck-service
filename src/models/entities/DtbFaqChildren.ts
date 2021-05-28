import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DtbFaqGroups } from "./DtbFaqGroups";

@Index("dtb_faq_children_pkey", ["childrenId"], { unique: true })
@Entity("dtb_faq_children", { schema: "public" })
export class DtbFaqChildren {
  @PrimaryGeneratedColumn({ type: "integer", name: "children_id" })
  childrenId: number;

  @Column("character varying", { name: "question", length: 1000 })
  question: string;

  @Column("character varying", { name: "answer", length: 1000 })
  answer: string;

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

  @ManyToOne(
    () => DtbFaqGroups,
    (dtbFaqGroups) => dtbFaqGroups.dtbFaqChildren,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "group_id", referencedColumnName: "id" }])
  group: DtbFaqGroups;
}
