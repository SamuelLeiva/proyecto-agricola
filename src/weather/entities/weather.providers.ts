import { DataSource } from "typeorm";
import { Weather } from "./weather.entity";

export const weatherProviders = [
    {
        provide: 'WEATHER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Weather),
        inject: ['DATA_SOURCE'],
    },
];
