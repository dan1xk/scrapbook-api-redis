import { ErrandDTO } from '../../dto';
import { ErrandEntity } from '../entities/errand';

export class ErrandRepository {
    async find(id: string) {
        const errands = await ErrandEntity.find({ where: { userId: id } });

        return errands;
    }

    async create(errandDTO: ErrandDTO) {
        const errand = await new ErrandEntity(
            errandDTO.errands,
            errandDTO.userId
        );
        errand.save();
        return errand;
    }

    async update(errandDTO: ErrandDTO) {
        const errand = await ErrandEntity.findOne(errandDTO.id);

        if (errand) {
            errand.errands = errandDTO.errands;
            await errand.save();
        }

        return errand;
    }

    async delete(errandID: number) {
        await ErrandEntity.delete(errandID);
    }
}
