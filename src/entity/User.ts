import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    discordId: string

    @Column({ default: 0, type: 'float' })
    points: number

    @Column({ nullable: true, default: null })
    timeZone: string // from the IANA timezone database
}
