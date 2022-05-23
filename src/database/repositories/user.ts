import { UserDTO } from "../../dto";
import { UserEntity } from "../entities/user";

export class UserRepository {
    async find() {
        const user = await UserEntity.find();
        return user;
    }

    async findOne(id: number) {
        const user = await UserEntity.findOne(id);
        return user;
    }

    async create(userDTO: UserDTO) {
        const user = await new UserEntity(userDTO.name, userDTO.password);
        user.save();
        return user;
    }

    async update(userDTO: UserDTO) {
        const user = await UserEntity.findOne(userDTO.id);

        if (user) {
            user.name = userDTO.name;
            user.password = userDTO.password;
        }

        return user;
    }

    async delete(userID: number) {
        await UserEntity.delete(userID);
    }
}