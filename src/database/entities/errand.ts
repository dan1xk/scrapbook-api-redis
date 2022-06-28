import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn
} from 'typeorm';
import { UserEntity } from './user';

@Entity({ name: 'scrapbook.errands' })
export class ErrandEntity extends BaseEntity {
    @PrimaryColumn()
    id?: number;

    @Column()
    errands: string;

    @Column({ name: 'user_id' })
    userId?: string;

    @ManyToOne((type) => UserEntity, (user) => user.errands)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: UserEntity;

    constructor(errands: string, userID: string) {
        super();
        this.errands = errands;
        this.userId = userID;
    }
}
