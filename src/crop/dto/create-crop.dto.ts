import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateCropDto {
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    location: string;

    @IsNotEmpty()
    size: number;

    @IsNotEmpty()
    sowingDate: Date;

    @IsNotEmpty()
    harvestDate: Date;
    
    
    plague?: boolean;
}
