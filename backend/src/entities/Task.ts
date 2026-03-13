import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  projectName!: string;

  @Column()
  summary!: string;

  @Column()
  description!: string;

  @Column()
  issueType!: string;

  @Column()
  priority!: string;

  @Column()
  status!: string;

  @Column()
  assignee!: string;

  @Column({ type: "date" })
  dueDate!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

