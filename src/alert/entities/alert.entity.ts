import { Crop } from "src/crop/entities/crop.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Alert {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    alert: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column()
    cropId: number;

    @ManyToOne(() => Crop, crop => crop.alerts)
    crop: Crop
}
