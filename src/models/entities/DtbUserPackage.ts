import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dtb_user_package_pkey", ["id"], { unique: true })
@Entity("dtb_user_package", { schema: "public" })
export class DtbUserPackage {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "user_id", default: () => "0" })
  userId: number;

  @Column("integer", { name: "package_id", default: () => "0" })
  packageId: number;

  @Column("integer", { name: "transaction_id", nullable: true })
  transactionId: number | null;

  @Column("integer", {
    name: "package_time_id",
    nullable: true,
    default: () => "0",
  })
  packageTimeId: number | null;

  @Column("character varying", {
    name: "package_code",
    nullable: true,
    length: 255,
  })
  packageCode: string | null;

  @Column("integer", {
    name: "total_truck_usage",
    nullable: true,
    default: () => "0",
  })
  totalTruckUsage: number | null;

  @Column("integer", {
    name: "number_of_truck_used",
    nullable: true,
    default: () => "0",
  })
  numberOfTruckUsed: number | null;

  @Column("numeric", {
    name: "total_day_usage",
    nullable: true,
    precision: 12,
    scale: 2,
  })
  totalDayUsage: string | null;

  @Column("numeric", { name: "price", nullable: true, precision: 12, scale: 2 })
  price: string | null;

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

  @Column("integer", { name: "quantity", nullable: true, default: () => "0" })
  quantity: number | null;

  @Column("integer", { name: "status", nullable: true, default: () => "0" })
  status: number | null;
}
