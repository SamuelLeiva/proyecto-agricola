import { Alert } from "src/alert/entities/alert.entity";
import { Weather } from "src/weather/entities/weather.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Crop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    location: string;

    @Column()
    size: number;

    @Column()
    sowingDate: Date;

    @Column()
    harvestDate: Date;

    @Column({default: false})
    plague: boolean;

    @OneToOne(()=>Weather)
    @JoinColumn()
    weather: Weather

    @OneToMany(() => Alert, alert => alert.crop)
    alerts: Alert[]
}
