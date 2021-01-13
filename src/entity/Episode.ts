import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Character_Data } from "./Character";
import { Comment } from "./Comments";

@Entity()
export class Episode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: "datetime" })
  releaseDate: Date;

  @Column({ nullable: false })
  episodeCode: string;

  @ManyToMany((type) => Character_Data, (character) => character.episodes, {
    eager: false,
    nullable: true,
  })
  characters: Character_Data[];

  @OneToMany((type) => Comment, (comment) => comment.episode, {
    eager: false,
    nullable: true,
  })
  episodeComments: Comment[];

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created: Date;
}
