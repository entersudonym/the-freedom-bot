import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { SprintStatus, SprintTier } from '../sprint/types'
import { Command } from './Command'
import { Sprint } from './Sprint'
import { User } from './User'

@Entity()
export class Sprinter extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @JoinColumn()
    sprint: Sprint

    @ManyToOne(() => User)
    @JoinColumn()
    user: User

    @Column({ type: 'enum' })
    tier: SprintTier

    @Column({ type: 'enum', default: SprintStatus.Enrolled })
    status: SprintStatus

    // TODO: set the length of this string somehow??
    @Column({ type: 'varchar' })
    failureReason: string
}
