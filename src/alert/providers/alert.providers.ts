import { DataSource } from "typeorm";
import { Alert } from "../entities/alert.entity";


export const alertProviders = [
    {
        provide: 'ALERT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Alert),
        inject: ['DATA_SOURCE'],
    },
];
