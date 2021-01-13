import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Character_Data } from "./Character";

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: "double" })
  latitude: number;

  @Column({ nullable: false, type: "double" })
  longitude: number;

  @OneToMany((type) => Character_Data, (character) => character.location, {
    eager: false,
    nullable: true,
  })
  characters: Character_Data[];

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created: Date;
}
