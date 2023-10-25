import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"

@Entity("tasks")
export class Task extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  description!: string

  @Column()
  status!: boolean

  @Column()
  user_id!: number
  
  @Column()
  created_at!: Date
  
  @Column()
  updated_at!: Date

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "user_id" }) // campo personalizado en la bd
  user!: User;
}
