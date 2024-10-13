import { IsNotEmpty, IsString } from "class-validator";

export class CreateAlertDto {
    @IsNotEmpty()
    @IsString()
    description:string
}
