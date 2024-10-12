import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Weather {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    temperature: number;

    @Column()
    humidity: number;

    @Column()
    precipitation: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
