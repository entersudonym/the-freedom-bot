import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from 'typeorm'
import { Invocations, InfoInvocations } from '../data/invocations'

@Entity()
export class Command extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column({
        type: 'enum',
        enum: { ...Invocations, ...InfoInvocations },
        nullable: false,
        unique: true
    })
    invocation: string

    @Column({ type: 'float', nullable: true }) // Allow nullability for info or info commands
    points: number

    @Column()
    isDaily: boolean

    @Column()
    isAdmin: boolean

    @BeforeInsert()
    ensureInvariants() {
        // Commands can't both be a daily discipline and an admin-only command
        if (this.isAdmin && this.isDaily) {
            throw new Error(`Command ${this.name} cannot both be admin-only and daily`)
        }
    }
}
