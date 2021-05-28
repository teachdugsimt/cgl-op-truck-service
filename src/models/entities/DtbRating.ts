import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_rating_pkey", ["id"], { unique: true })
@Entity("dtb_rating", { schema: "public" })
export class DtbRating {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "contract_id" })
  contractId: number;

  @Column("integer", { name: "user_rated", nullable: true })
  userRated: number | null;

  @Column("integer", { name: "role_rated", nullable: true })
  roleRated: number | null;

  @Column("numeric", {
    name: "rating_point",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  ratingPoint: string | null;

  @Column("character varying", {
    name: "rating_list",
    nullable: true,
    length: 100,
    default: () => "NULL::character varying",
  })
  ratingList: string | null;

  @Column("text", { name: "rating_comment", nullable: true })
  ratingComment: string | null;

  @Column("character varying", {
    name: "improve_list",
    nullable: true,
    length: 100,
    default: () => "NULL::character varying",
  })
  improveList: string | null;

  @Column("text", { name: "improve_comment", nullable: true })
  improveComment: string | null;

  @Column("integer", { name: "recommend", nullable: true })
  recommend: number | null;

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
}
