import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Picture } from "src/entities/picture.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PictureService extends TypeOrmCrudService<Picture> {
    constructor(
        @InjectRepository(Picture) private readonly picture: Repository<Picture>) {
        super(picture);
    }

    add(newPicture: Picture): Promise <Picture> {
       return this.picture.save(newPicture);
    }
}