import { ErrandRepository } from '../database/repositories';
import { ErrandDTO } from '../dto';

export class ErrandService {
    async find(id: string) {
        const repository = new ErrandRepository();
        const errand = await repository.find(id);

        return errand;
    }

    async create(errandDTO: ErrandDTO) {
        const repository = new ErrandRepository();
        const errand = await repository.create(errandDTO);

        return errand;
    }

    async update(errandDTO: ErrandDTO) {
        const repository = new ErrandRepository();
        const errand = await repository.update(errandDTO);

        return errand;
    }

    async delete(errandID: number) {
        const repository = new ErrandRepository();
        await repository.delete(errandID);
    }
}
