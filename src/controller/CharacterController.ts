import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Character_Data } from "../entity/Character";
import { CharacterCreateDto } from "../dtos/character-create.dto";
import { validate } from "class-validator";

export class CharacterController {
  private characterRepository = getRepository(Character_Data);

  async all(request: Request, response: Response, next: NextFunction) {
    const query = this.characterRepository.createQueryBuilder("character");
    const sort = request.query.sort;
    if (sort) {
      const [criterion, order] = (sort as string).split("_");
      if (criterion) {
        if (criterion !== "gender" && criterion !== "name") {
          return { error: "Invalid Sorting Parameters" };
        }
        if (order) {
          if (order !== "ASC" && order !== "DESC") {
            return { error: "Invalid Sorting Parameters" };
          }
        }
        query.orderBy(
          criterion === "gender" ? "gender" : "lastName",
          order === "ASC" ? "ASC" : "DESC"
        );
      }
    }
    const filter = request.query.filter;

    if (filter) {
      const [basis, value] = (filter as string).split("_");
      if (basis === "gender") {
        query.where("character.gender = :gender", { gender: value });
      }
      if (basis === "status") {
        query.where("character.status = :status", { status: value });
      }
      if (basis === "location") {
        query.leftJoinAndSelect("character.location", "location");
        query.where("location.name LIKE :search ", {
          search: `%${value}%`,
        });
      }
    }

    const characters = await query.getMany();
    return characters;
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const character = await this.characterRepository.findOne(
      request.params.id,
      {
        relations: ["episodes"],
      }
    );
    return character ? character.episodes : { error: "Character not found" };
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const {
      firstName,
      lastName,
      status,
      gender,
      stateOfOrigin,
      locationId,
      episodeIds,
    } = request.body;
    const characterCreateDto = new CharacterCreateDto();
    characterCreateDto.firstName = firstName;
    characterCreateDto.lastName = lastName;
    characterCreateDto.status = status;
    characterCreateDto.gender = gender;
    characterCreateDto.stateOfOrigin = stateOfOrigin;
    characterCreateDto.locationId = locationId;
    characterCreateDto.episodeIds = episodeIds;

    const errors = await validate(characterCreateDto);
    if (errors.length > 0) {
      return { error: `${errors[0].property} is invalid` };
    }

    delete characterCreateDto.episodeIds;
    const newCharacter = new Character_Data();
    Object.assign(newCharacter, characterCreateDto);

    try {
      await newCharacter.save();
      if (episodeIds && episodeIds.length > 0) {
        await this.characterRepository
          .createQueryBuilder()
          .relation(Character_Data, "episodes")
          .of(newCharacter)
          .add(episodeIds);
      }
      return newCharacter;
    } catch (e) {
      if (e.errno === 1452) return { error: "Invalid Foreign Key Id" };
      return { error: "An Error Occurred" };
    }
  }
}
