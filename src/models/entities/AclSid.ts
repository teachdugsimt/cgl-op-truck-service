import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AclEntry } from "./AclEntry";
import { AclObjectIdentity } from "./AclObjectIdentity";

@Index("acl_sid_pkey", ["id"], { unique: true })
@Entity("acl_sid", { schema: "public" })
export class AclSid {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("boolean", { name: "principal" })
  principal: boolean;

  @Column("character varying", { name: "sid", length: 100 })
  sid: string;

  @OneToMany(() => AclEntry, (aclEntry) => aclEntry.s)
  aclEntries: AclEntry[];

  @OneToMany(
    () => AclObjectIdentity,
    (aclObjectIdentity) => aclObjectIdentity.ownerS
  )
  aclObjectIdentities: AclObjectIdentity[];
}
