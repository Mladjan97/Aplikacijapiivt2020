/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Body, Param, UseInterceptors, UploadedFile, Req } from "@nestjs/common";
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
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';

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
                    req.fileFilterError = 'Bad file extension!';
                    callback(null, false);
                    return;
                }

                if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
                    req.fileFilterError = 'Bad file content type!';
                    callback(null, false);
                    return;
                }

                callback(null, true);

            },
            limits: {
                files: 1,
                fileSize: StorageConfig.photoMaxFileSize,
            }
        })
    )
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async uploadPhoto(
        @Param('id') productId: number,
        @UploadedFile() picture,
        @Req() req
    ): Promise <ApiResponse | Picture> {

        if(req.fileFilterError){
            return new ApiResponse('error', -4002, req.fileFilterError);
        }

        if(!picture) {
            return new ApiResponse('error', -4002, 'File not uploaded');
        }

        const fileTypeResult = await fileType.fromFile(picture.path);
        if (!fileTypeResult) {
            fs.unlinkSync(picture.path);

            return new ApiResponse('error', -4002, 'Cannot detect file type!');
        }

        const realMimeType = fileTypeResult.mime;
        if (!(realMimeType.includes('jpeg') || realMimeType.includes('png'))) {
            fs.unlinkSync(picture.path);
            
            return new ApiResponse('error', -4002, 'Bad file content type!');
        }

        await this.createThumb(picture);
        await this.createSmallImage(picture);

        const newPicture: Picture = new Picture();
        newPicture.productId = productId;
        newPicture.imagePath = picture.filename;

       const savedPicture = await this.pictureService.add(newPicture);
       if (!savedPicture) {
           return new ApiResponse('error', -4001);
       }
       return savedPicture;
    }

    async createThumb(picture) {
        const originalFilePath = picture.path;
        const fileName = picture.filename;

        const destinationFilePath = StorageConfig.photoDestination + "thumb/" + fileName;
        
        await sharp(originalFilePath)
            .resize({
                fit: 'cover',
                width: StorageConfig.photoThumbSize.width,
                height: StorageConfig.photoThumbSize.height,
                background: {
                    r: 255, g: 255, b:255, alpha: 0.0
                }
            })
            .toFile(destinationFilePath);
    }

    async createSmallImage(picture) {
        const originalFilePath = picture.path;
        const fileName = picture.filename;

        const destinationFilePath = StorageConfig.photoDestination + "small/" + fileName;
        
        await sharp(originalFilePath)
            .resize({
                fit: 'cover',
                width: StorageConfig.photoSmallSize.width,
                height: StorageConfig.photoSmallSize.height,
                background: {
                    r: 255, g: 255, b:255, alpha: 0.0
                }
            })
            .toFile(destinationFilePath);
        
    }
}