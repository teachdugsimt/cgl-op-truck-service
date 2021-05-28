import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_seats_pkey", ["id"], { unique: true })
@Entity("dtb_seats", { schema: "public" })
export class DtbSeats {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "car_id" })
  carId: number;

  @Column("integer", { name: "seat_no", nullable: true })
  seatNo: number | null;

  @Column("numeric", {
    name: "price",
    nullable: true,
    precision: 12,
    scale: 0,
    default: () => "NULL::numeric",
  })
  price: string | null;

  @Column("smallint", { name: "status", nullable: true })
  status: number | null;

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
