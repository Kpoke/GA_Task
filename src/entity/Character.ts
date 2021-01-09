import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { CharacterStatus } from "../character-status.enum";
import { Gender } from "../gender.enum";
import { Location } from "./Location";
import { Episode } from "./Episode";

@Entity()
export class Character_Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  status: CharacterStatus;

  @Column({ nullable: true })
  stateOfOrigin: string;

  @Column({ nullable: false })
  gender: Gender;

  @OneToOne((type) => Location, { nullable: true })
  @JoinColumn()
  location: Location;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created: Date;

  @ManyToMany((type) => Episode, (episode) => episode.characters, {
    eager: false,
    nullable: true,
  })
  @JoinTable()
  episode: Episode;
}
