import { IsNotEmpty, IsString, MaxLength, IsNumber } from "class-validator";

export class CommentCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(249)
  comment: string;

  @IsNotEmpty()
  @IsString()
  ipAddressLocation: string;

  @IsNotEmpty()
  @IsNumber()
  episodeId: number;
}
