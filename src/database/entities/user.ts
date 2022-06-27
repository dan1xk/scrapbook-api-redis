import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, BeforeInsert } from 'typeorm';
import { ErrandEntity } from './errand';
import bcrypt from 'bcryptjs';

@Entity({ name: 'scrapbook.user' })
export class UserEntity extends BaseEntity {
    @PrimaryColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 12);
    }

    @OneToMany((type) => ErrandEntity, (errands) => errands.user)
    errands?: ErrandEntity[];

    constructor(name: string, password: string) {
        super();
        this.name = name;
        this.password = password;
    }
}
