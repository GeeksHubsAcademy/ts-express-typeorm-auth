import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}
