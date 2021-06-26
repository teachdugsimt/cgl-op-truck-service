import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("truck_photo_pkey", ["id"], { unique: true })
@Entity("truck_photo", { schema: "public" })
export class TruckPhoto {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "truck_id" })
  truckId: number;

  @Column("character varying", { name: "photo_name", length: 255 })
  photoName: string;

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

  @Column("integer", { name: "type", nullable: true })
  type: number | null;

}
