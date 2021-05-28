import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AclObjectIdentity } from "./AclObjectIdentity";

@Index("acl_class_pkey", ["id"], { unique: true })
@Entity("acl_class", { schema: "public" })
export class AclClass {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "class", length: 255 })
  class: string;

  @OneToMany(
    () => AclObjectIdentity,
    (aclObjectIdentity) => aclObjectIdentity.objectIdClass
  )
  aclObjectIdentities: AclObjectIdentity[];
}
