import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Sprint extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    // TODO: bool vs boolean?
    @Column({ type: 'boolean' })
    active: boolean

    // TODO: maybe find a nicer way to store this?
    @Column({ type: 'int4' })
    month: number

    @Column({ type: 'integer' })
    year: number

    @BeforeInsert()
    ensureInvariants() {
        if (this.month < 0 || this.month > 11) {
            throw new Error(`Cannot set month outside of [0, 11]. Given: ${this.month}`)
        }

        if (this.year < 2000 || this.year > 2100) {
            throw new Error(`Are you a time traveller? Got unreasonable year: ${this.year}`)
        }
    }
}
