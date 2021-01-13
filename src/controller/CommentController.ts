import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Comment } from "../entity/Comments";
import { CommentCreateDto } from "../dtos/comment-create.dto";
import { validate } from "class-validator";
import { lookup } from "geoip-lite";

export class CommentController {
  private commentRepository = getRepository(Comment);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.commentRepository
      .createQueryBuilder("comment")
      .orderBy("created", "DESC")
      .getMany();
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const geo = lookup(request.ip);
    const { comment, episodeId } = request.body;
    const commentCreateDto = new CommentCreateDto();
    commentCreateDto.comment = comment;
    commentCreateDto.episodeId = episodeId;
    commentCreateDto.ipAddressLocation = geo ? geo.country : "Not able to Get";
    const errors = await validate(commentCreateDto);
    if (errors.length > 0) {
      return { error: `${errors[0].property} is invalid` };
    }

    const newComment = new Comment();
    Object.assign(newComment, commentCreateDto);
    try {
      await newComment.save();
      return newComment;
    } catch (e) {
      if (e.errno === 1452) return { error: "Invalid Episode Id" };
      return { error: "An Error Occurred" };
    }
  }
}
