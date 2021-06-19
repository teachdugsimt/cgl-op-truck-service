import {
  Index, Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn,
} from "typeorm";
// import { DtbTruckWorkingZone } from './dtb-truck-working-zone.entity'

@Index("truck_pkey", ["id"], { unique: true })
@Entity("truck", { schema: "public" })
export class DtbTruck {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number

  @Column({ length: 255, nullable: true })
  name: string

  @Column({ type: 'int4', nullable: false, default: 0 })
  carrier_id: number

  @Column({ length: 255, nullable: true })
  registration_number: string

  @Column({ type: 'float8', nullable: true, default: 0 })
  loading_weight: number

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: string

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: string


  @Column({ type: 'varchar', length: 254, nullable: true })
  created_user: string

  @Column({ type: 'int4', nullable: false })
  updated_user: number

  @Column({ type: 'int4', nullable: false })
  is_deleted: number

  @Column({ type: 'int4', nullable: false })
  truck_type: number

  @Column({ type: 'int4', nullable: false })
  approve_status: number

  @Column({ type: 'int4', nullable: false })
  approve_date: number

  @Column({ type: 'int4', nullable: false })
  group_truck_type: number

  @Column({ type: 'int4', nullable: false })
  is_tipper: number

  @Column({ type: 'int4', nullable: false })
  stall_height: number

}
