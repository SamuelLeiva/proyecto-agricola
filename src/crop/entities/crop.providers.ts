import { DataSource } from "typeorm";
import { Crop } from "./crop.entity";

export const cropProviders = [
    {
        provide: 'CROP_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Crop),
        inject: ['DATA_SOURCE'],
    },
];
