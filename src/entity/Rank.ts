import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Rank extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    level: number

    @Column()
    lowerBound: number

    // Allow nullability for the highest-rank
    @Column({ nullable: true })
    upperBound: number
}
