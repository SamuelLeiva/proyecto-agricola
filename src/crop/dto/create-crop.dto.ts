import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCropDto {
    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsNumber()
    size: number;

    @IsNotEmpty()
    sowingDate: Date;

    @IsNotEmpty()
    harvestDate: Date;
    
    
    plague?: boolean;
}
