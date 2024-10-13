import { IsNotEmpty } from "class-validator";

export class CreateAlertDto {
    @IsNotEmpty()
    description:string
}
