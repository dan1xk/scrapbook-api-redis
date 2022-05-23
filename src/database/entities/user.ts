import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ErrandEntity } from "./errand";

@Entity({ name: "scrapbook.users" })
export class UserEntity extends BaseEntity {
    @PrimaryColumn()
    id?: Number;

    @Column()
    name: String;

    @Column()
    password: String;
    
    @OneToMany(type => ErrandEntity, errands => errands.user)
    errands?: ErrandEntity[];

    constructor(name: String,  password: String) {
        super();
        this.name = name;
        this.password = password;
    }
}
