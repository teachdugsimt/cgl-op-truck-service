import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_evaluation_form_pkey", ["id"], { unique: true })
@Entity("dtb_evaluation_form", { schema: "public" })
export class DtbEvaluationForm {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "order_id", default: () => "0" })
  orderId: number;

  @Column("integer", { name: "user_id", default: () => "0" })
  userId: number;

  @Column("integer", { name: "evaluation_id", default: () => "0" })
  evaluationId: number;

  @Column("integer", { name: "max_score", default: () => "0" })
  maxScore: number;

  @Column("integer", { name: "score", default: () => "0" })
  score: number;

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
