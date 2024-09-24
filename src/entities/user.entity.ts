import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({default: 5})
    quizAttempts: number

    @Column({default: 2})
    lessonToQuizAttempts: number
}
