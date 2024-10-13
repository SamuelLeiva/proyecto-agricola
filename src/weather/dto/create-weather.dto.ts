import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateWeatherDto {
    @IsNotEmpty()
    @IsNumber()
    temperature: number

    @IsNotEmpty()
    @IsNumber()
    humidity: number

    @IsNotEmpty()
    @IsNumber()
    precipitation: number
}
