export class CreateCropDto {
    type: string;
    location: string;
    size: number;
    sowingDate: Date;
    harvestDate: Date;
    plague?: boolean;
}
