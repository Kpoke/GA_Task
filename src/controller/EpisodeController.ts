import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { Episode } from "../entity/Episode";
import { EpisodeCreateDto } from "../dtos/episode-create.dto";

export class EpisodeController {
  private episodeRepository = getRepository(Episode);

  async all(request: Request, response: Response, next: NextFunction) {
    const episodes = await this.episodeRepository
      .createQueryBuilder("episode")
      .leftJoinAndSelect("episode.episodeComments", "comments")
      .select([
        "name",
        "releaseDate",
        "episode.created AS created",
        "episodeCode",
      ])
      .addSelect("COUNT(comments.id)", "noOfComments")
      .groupBy("episode.id")
      .orderBy("releaseDate", "ASC")
      .getRawMany();
    return episodes;
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const episodeCreateDto = new EpisodeCreateDto();
    const { name, releaseDate, episodeCode, characterIds } = request.body;
    episodeCreateDto.name = name;
    episodeCreateDto.releaseDate = new Date(releaseDate);
    episodeCreateDto.episodeCode = episodeCode;
    episodeCreateDto.characterIds = characterIds;
    const errors = await validate(episodeCreateDto);
    if (errors.length > 0) {
      return { error: `${errors[0].property} is invalid` };
    }

    delete episodeCreateDto.characterIds;
    const newEpisode = new Episode();
    Object.assign(newEpisode, episodeCreateDto);

    try {
      await newEpisode.save();
      await this.episodeRepository
        .createQueryBuilder()
        .relation(Episode, "characters")
        .of(newEpisode)
        .add(characterIds);
      return newEpisode;
    } catch (e) {
      if (e.errno === 1452) return { error: "Invalid Foreign Key Id" };
      return { error: "An Error Occurred" };
    }
  }
}
