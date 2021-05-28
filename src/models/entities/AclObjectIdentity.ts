import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AclEntry } from "./AclEntry";
import { AclClass } from "./AclClass";
import { AclSid } from "./AclSid";

@Index("acl_object_identity_pkey", ["id"], { unique: true })
@Entity("acl_object_identity", { schema: "public" })
export class AclObjectIdentity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "object_id_identity", length: 36 })
  objectIdIdentity: string;

  @Column("boolean", { name: "entries_inheriting" })
  entriesInheriting: boolean;

  @OneToMany(() => AclEntry, (aclEntry) => aclEntry.aclObjectIdentity)
  aclEntries: AclEntry[];

  @ManyToOne(() => AclClass, (aclClass) => aclClass.aclObjectIdentities, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "object_id_class", referencedColumnName: "id" }])
  objectIdClass: AclClass;

  @ManyToOne(() => AclSid, (aclSid) => aclSid.aclObjectIdentities, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "owner_sid", referencedColumnName: "id" }])
  ownerS: AclSid;

  @ManyToOne(
    () => AclObjectIdentity,
    (aclObjectIdentity) => aclObjectIdentity.aclObjectIdentities,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "parent_object", referencedColumnName: "id" }])
  parentObject: AclObjectIdentity;

  @OneToMany(
    () => AclObjectIdentity,
    (aclObjectIdentity) => aclObjectIdentity.parentObject
  )
  aclObjectIdentities: AclObjectIdentity[];
}
