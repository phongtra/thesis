import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Voter extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  socialNumber: string;
  @Column()
  address: string;
  @Column()
  privateKey: string;
}
