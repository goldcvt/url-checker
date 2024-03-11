import { Check, Column, PrimaryGeneratedColumn } from 'typeorm';

const RawUrlFields = {
  id: 'id',
  url: 'url',
  last_checked_at: 'last_checked_at',
  last_check_status: 'last_check_status',
  last_resolved_ip: 'last_resolved_ip',
} as const;

export type RawUrl = {
  [RawUrlFields.id]: number;
  [RawUrlFields.url]: string;
  [RawUrlFields.last_checked_at]: Date;
  [RawUrlFields.last_check_status]: number;
  [RawUrlFields.last_resolved_ip]: string;
};

export class UrlEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: RawUrlFields.id,
    primaryKeyConstraintName: 'url_pkey',
  })
  id: number;

  @Column({
    name: RawUrlFields.url,
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Original URL, will not be updated',
  })
  url: string;

  @Column({
    name: RawUrlFields.last_checked_at,
    type: 'timestamptz',
    nullable: true,
  })
  lastCheckedAt: Date | null;

  @Check(
    `${RawUrlFields.last_check_status} > 100 AND ${RawUrlFields.last_check_status} < 600`,
  )
  @Column({
    name: RawUrlFields.last_check_status,
    type: 'smallint',
    nullable: true,
  })
  lastCheckStatus: number | null;

  @Column({
    name: RawUrlFields.last_resolved_ip,
    type: 'text',
    nullable: false,
  })
  lastResolvedIp: string;
}
