import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_truck_price_configuration_pkey", ["id"], { unique: true })
@Entity("dtb_truck_price_configuration", { schema: "public" })
export class DtbTruckPriceConfiguration {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", {
    name: "truck_type_id",
    nullable: true,
    default: () => "0",
  })
  truckTypeId: number | null;

  @Column("integer", {
    name: "number_of_wheels",
    nullable: true,
    default: () => "0",
  })
  numberOfWheels: number | null;

  @Column("numeric", {
    name: "price_of_truck",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  priceOfTruck: string | null;

  @Column("integer", {
    name: "depreciation_year",
    nullable: true,
    default: () => "0",
  })
  depreciationYear: number | null;

  @Column("numeric", {
    name: "front_brake_pad_price",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  frontBrakePadPrice: string | null;

  @Column("numeric", {
    name: "back_brake_pad_price",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  backBrakePadPrice: string | null;

  @Column("numeric", {
    name: "total_brake_pad_price",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  totalBrakePadPrice: string | null;

  @Column("numeric", {
    name: "rate_of_fuel",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  rateOfFuel: string | null;

  @Column("numeric", {
    name: "insurance",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  insurance: string | null;

  @Column("numeric", {
    name: "annual_tax",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  annualTax: string | null;

  @Column("numeric", {
    name: "driver_wage",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  driverWage: string | null;

  @Column("numeric", {
    name: "porter_wage",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  porterWage: string | null;

  @Column("numeric", {
    name: "maintenance",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  maintenance: string | null;

  @Column("numeric", {
    name: "cost_of_tire",
    nullable: true,
    precision: 12,
    scale: 2,
    default: () => "NULL::numeric",
  })
  costOfTire: string | null;

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
