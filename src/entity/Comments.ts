import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Episode } from "./Episode";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 249 })
  comment: string;

  @Column({ nullable: false })
  ipAddressLocation: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created: Date;

  @ManyToOne((type) => Episode, (episode) => episode.episodeComments, {
    eager: false,
    nullable: true,
  })
  episode: Episode;
}
