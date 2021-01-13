import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { CharacterStatus } from "../character-status.enum";
import { Gender } from "../gender.enum";
import { Location } from "./Location";
import { Episode } from "./Episode";

@Entity()
export class Character_Data extends BaseEntity {
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

  @ManyToOne((type) => Location, (location) => location.characters, {
    nullable: true,
    eager: false,
  })
  location: Location;

  @Column({ nullable: true })
  locationId: number;

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
  episodes: Episode[];
}
