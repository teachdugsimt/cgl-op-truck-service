import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AclObjectIdentity } from "./AclObjectIdentity";
import { AclSid } from "./AclSid";

@Index("acl_entry_pkey", ["id"], { unique: true })
@Entity("acl_entry", { schema: "public" })
export class AclEntry {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("integer", { name: "ace_order" })
  aceOrder: number;

  @Column("integer", { name: "mask" })
  mask: number;

  @Column("boolean", { name: "granting" })
  granting: boolean;

  @Column("boolean", { name: "audit_success" })
  auditSuccess: boolean;

  @Column("boolean", { name: "audit_failure" })
  auditFailure: boolean;

  @ManyToOne(
    () => AclObjectIdentity,
    (aclObjectIdentity) => aclObjectIdentity.aclEntries,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "acl_object_identity", referencedColumnName: "id" }])
  aclObjectIdentity: AclObjectIdentity;

  @ManyToOne(() => AclSid, (aclSid) => aclSid.aclEntries, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "sid", referencedColumnName: "id" }])
  s: AclSid;
}
