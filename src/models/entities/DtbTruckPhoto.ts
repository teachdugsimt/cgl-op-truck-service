import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DtbTruck } from "./DtbTruck";

@Index("dtb_truck_photo_pkey", ["id"], { unique: true })
@Entity("dtb_truck_photo", { schema: "public" })
export class DtbTruckPhoto {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "photo_name", length: 255 })
  photoName: string;

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

  @Column("integer", { name: "type", nullable: true })
  type: number | null;

  @ManyToOne(() => DtbTruck, (dtbTruck) => dtbTruck.dtbTruckPhotos)
  @JoinColumn([{ name: "truck_id", referencedColumnName: "id" }])
  truck: DtbTruck;
}
