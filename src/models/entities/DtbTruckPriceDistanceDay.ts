import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("dtb_truck_price_distance_day", { schema: "public" })
export class DtbTruckPriceDistanceDay {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", {
    name: "group_truck",
    nullable: true,
    default: () => "0",
  })
  groupTruck: number | null;

  @Column("integer", {
    name: "number_of_wheels",
    nullable: true,
    default: () => "0",
  })
  numberOfWheels: number | null;

  @Column("integer", {
    name: "min_distance",
    nullable: true,
    default: () => "0",
  })
  minDistance: number | null;

  @Column("integer", {
    name: "max_distance",
    nullable: true,
    default: () => "0",
  })
  maxDistance: number | null;

  @Column("integer", { name: "day", nullable: true, default: () => "0" })
  day: number | null;
}
