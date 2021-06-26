import { Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { DtbTruck } from './truck.entity'

@Index("truck_working_zone_pkey", ["id"], { unique: true })
@Entity("truck_working_zone", { schema: "public" })
export class DtbTruckWorkingZone {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "truck_id" })
  truck_id: number;

  @Column("integer", { name: "region", nullable: true })
  region: number | null;

  @Column("integer", { name: "province", nullable: true })
  province: number | null;

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

  // @ManyToOne(type => DtbTruck, truck => truck.truck_working_zones)
  // @JoinColumn([{ name: "truck_id", referencedColumnName: "id" }])
  // truck: DtbTruck;
}
