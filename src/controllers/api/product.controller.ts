/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Body, Param, UseInterceptors, UploadedFile } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { ProductService } from "src/services/product/product.service";
import { Product } from "entities/product.entity";
import { AddProductDto } from "src/dtos/product/add.product.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StorageConfig } from "config/storage.config";
import { PictureService } from "src/services/picture/picture.service";
import { Picture } from "entities/picture.entity";
import { ApiResponse } from "src/misc/api.response.class";

@Controller('api/product')
@Crud({
    model: {
        type: Product
    },
    params: {
        id: {
            field: 'productId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            category: {
                eager: true
            },
            pictures: {
                eager: true
            },
            productMaterial: {
                eager: true   
            },
            productPrices: {
                eager: true
            },
            inStocks: {
                eager: true
            }
        }
    }
})
export class ProductController {
    constructor(
        public service: ProductService,
        
        public pictureService: PictureService,
        ) { }

    @Post('createFull') 
    createFullProduct(@Body() data: AddProductDto) {

        return this.service.createFullProduct(data);
    }

    @Post(':id/uploadPicture/')
    @UseInterceptors(
        FileInterceptor('picture', {
            storage: diskStorage({
                destination: StorageConfig.photoDestination,
                filename: (req, file, callback) => {

                    // eslint-disable-next-line prefer-const
                    let original = file.originalname;

                    let normalized = original.replace(/\s+/g, '-');
                    normalized = normalized.replace(/[^A-z0-9\.\-]/g, '');
                    let sada = new Date();

                    let datePart = '';
                    datePart += sada.getFullYear().toString();
                    datePart += (sada.getMonth() +1).toString();
                    datePart += sada.getDate().toString();


                    let randomPart: string =
                    new Array(10).fill(0).map(e => (Math.random() * 9).toFixed(0).toString())
                    .join('');

                    let fileName = datePart + '-' + randomPart + '-' + normalized;

                    fileName = fileName.toLocaleLowerCase();
                    
                    callback(null, fileName);
                }
            }),
            fileFilter: (req, file, callback) => {

                if (!file.originalname.toLowerCase().match(/\.(jpg|png)$/)) {
                    callback(new Error('Bad file extensions!'), false);
                    return;
                }

                if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
                    callback(new Error('Bad file content!'), false);
                    return;
                }

                callback(null, true);

            },
            limits: {
                files: 1,
                fieldSize: StorageConfig.photoMaxFileSize,
            }
        })
    )
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async uploadPhoto(@Param('id') productId: number, @UploadedFile() picture): Promise <ApiResponse | Picture> {

        const newPicture: Picture = new Picture();
        newPicture.productId = productId;
        newPicture.imagePath = picture.filename;

       const savedPicture = await this.pictureService.add(newPicture);
       if (!savedPicture) {
           return new ApiResponse('error', -4001);
       }
       return savedPicture;
    }
}