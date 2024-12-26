import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

@Entity("post")
export class PostEntity extends CoreEntity {
	@PrimaryGeneratedColumn("uuid")
	uuid;

	@Column({ type: "varchar", nullable: false })
	title: string;

	@Column({ type: "text", nullable: false })
	content: string;

	@ManyToOne(() => UserEntity, (user) => user.posts, {
		nullable: false,
		onDelete: "CASCADE",
	})
	user: UserEntity;
}
