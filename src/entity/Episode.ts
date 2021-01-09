import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Character_Data } from "./Character";
import { Comment } from "./Comments";

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  releaseDate: string;

  @Column({ nullable: false })
  episodeCode: string;

  @ManyToMany((type) => Character_Data, (character) => character.episode, {
    eager: true,
    nullable: true,
  })
  characters: Character_Data[];

  @OneToMany((type) => Comment, (comment) => comment.episode, {
    eager: true,
    nullable: true,
  })
  episodeComments: Comment[];

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created: Date;
}
