import { IsNotEmpty } from "class-validator"

export class CreateWeatherDto {
    @IsNotEmpty()
    temperature: number

    @IsNotEmpty()
    humidity: number

    @IsNotEmpty()
    precipitation: number
}
