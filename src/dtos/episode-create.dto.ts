import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  IsDate,
} from "class-validator";

export class EpisodeCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  releaseDate: Date;

  @IsString()
  @IsNotEmpty()
  episodeCode: string;

  @IsArray()
  @IsOptional()
  characterIds: Number[];
}
