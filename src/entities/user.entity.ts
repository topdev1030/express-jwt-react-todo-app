import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CoreEntity } from "./core.entity";
import { PostEntity } from "./post.entity";
@Entity("user")
export class UserEntity extends CoreEntity {
	@PrimaryGeneratedColumn("uuid")
	uuid;
	@Column({ type: "varchar", nullable: true })
	username;
	@Column({ type: "varchar", nullable: false, unique: true })
	email;
	@Column({ type: "varchar", nullable: false })
	password;
	@OneToMany(() => PostEntity, (post) => post.user)
	posts: PostEntity[];
}
