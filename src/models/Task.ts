import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"
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

  @ManyToMany(() => User)
  @JoinTable({
     name: "task_user",
     joinColumn: {
        name: "task_id",
        referencedColumnName: "id",
     },
     inverseJoinColumn: {
        name: "user_id",
        referencedColumnName: "id",
     },
  })
  taskUsers!: User[];
}
