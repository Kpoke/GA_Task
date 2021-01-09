import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: "double" })
  latitude: number;

  @Column({ nullable: false, type: "double" })
  longitude: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created: Date;
}
