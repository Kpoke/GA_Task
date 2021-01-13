import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { LocationCreateDto } from "../dtos/location-create.dto";
import { Location } from "../entity/Location";

export class LocationController {
  private locationRepository = getRepository(Location);

  async all(request: Request, response: Response, next: NextFunction) {
    return await this.locationRepository.find();
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const locationCreateDto = new LocationCreateDto();
    const { name, latitude, longitude, characterIds } = request.body;
    locationCreateDto.name = name;
    locationCreateDto.longitude = longitude;
    locationCreateDto.latitude = latitude;
    locationCreateDto.characterIds = characterIds;
    const errors = await validate(locationCreateDto);
    if (errors.length > 0) {
      return { error: `${errors[0].property} is invalid` };
    }

    delete locationCreateDto.characterIds;
    const newLocation = new Location();
    Object.assign(newLocation, locationCreateDto);

    try {
      await newLocation.save();
      if (characterIds && characterIds.length > 0) {
        await this.locationRepository
          .createQueryBuilder()
          .relation(Location, "characters")
          .of(newLocation)
          .add(characterIds);
      }
      return newLocation;
    } catch (e) {
      if (e.errno === 1452) return { error: "Invalid Foreign Key Id" };
      return { error: "An Error Occurred" };
    }
  }
}
