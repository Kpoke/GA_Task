import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  IsDate,
  IsNumber,
} from "class-validator";

export class LocationCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: Number;

  @IsNotEmpty()
  @IsNumber()
  longitude: Number;

  @IsArray()
  @IsOptional()
  characterIds: Number[];
}
