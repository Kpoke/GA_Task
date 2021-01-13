import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsIn,
  IsOptional,
} from "class-validator";
import { CharacterStatus } from "../character-status.enum";
import { Gender } from "../gender.enum";

export class CharacterCreateDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsIn([CharacterStatus.ACTIVE, CharacterStatus.DEAD, CharacterStatus.UNKNOWN])
  status: CharacterStatus;

  @IsString()
  @IsOptional()
  stateOfOrigin: string;

  @IsNotEmpty()
  @IsIn([Gender.FEMALE, Gender.MALE])
  gender: Gender;

  @IsNumber()
  @IsOptional()
  locationId: Number;

  @IsArray()
  @IsOptional()
  episodeIds: Number[];
}
