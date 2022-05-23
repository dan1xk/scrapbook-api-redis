import { UserRepository } from "../database/repositories";
import { UserDTO } from "../dto";

export class UserService {
    async find() {
        const repository = new UserRepository();
        const user = await repository.find();

        return user;
    }

    async findOne(id: number) {
        const repository = new UserRepository();
        const user = await repository.findOne(id);

        return user;
    }

    async create(userDTO: UserDTO) {
        const repository = new UserRepository();
        
        if (userDTO.name.length >= 3 && userDTO.password.length >= 4) {
            return  await repository.create(userDTO);
        }     
    }

    async update(userDTO: UserDTO) {
        const repository = new UserRepository();
        
        if (userDTO.name.length >= 3 && userDTO.password.length >= 4) {
            return  await repository.update(userDTO);
        }  
    }

    async delete(userID: number) {
        const repository = new UserRepository();
        await repository.delete(userID);
    }

}