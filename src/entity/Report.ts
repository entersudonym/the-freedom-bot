import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { Command } from './Command'
import { User } from './User'

@Entity()
export class Report extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User)
    @JoinColumn()
    user: User

    @ManyToOne(() => Command)
    @JoinColumn()
    command: Command

    @Column({ type: 'float' })
    points: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date

    @Column()
    isRegression: boolean

    @Column({ nullable: true })
    day: number

    @BeforeInsert()
    ensureInvariants() {
        if (this.isRegression) {
            const negativePoints = this.points < 0
            const zeroDay = this.day === 0

            if (!negativePoints || !zeroDay) {
                throw new Error(
                    `Cannot make regression report with non-negative points or non-zero day`
                )
            }
        }
    }
}
