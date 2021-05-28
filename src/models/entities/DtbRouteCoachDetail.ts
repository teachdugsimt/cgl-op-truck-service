import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_route_coach_detail_pkey", ["id"], { unique: true })
@Entity("dtb_route_coach_detail", { schema: "public" })
export class DtbRouteCoachDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "route_coach_id" })
  routeCoachId: number;

  @Column("character varying", { name: "address", length: 250 })
  address: string;

  @Column("double precision", {
    name: "latitude",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  latitude: number | null;

  @Column("double precision", {
    name: "longitude",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  longitude: number | null;

  @Column("text", { name: "note", nullable: true })
  note: string | null;

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
