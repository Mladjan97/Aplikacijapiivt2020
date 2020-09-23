/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Body, Param, UseInterceptors, UploadedFile, Req, Delete, Patch, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { ProductService } from "src/services/product/product.service";
import { Product } from "src/entities/product.entity";
import { AddProductDto } from "src/dtos/product/add.product.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StorageConfig } from "config/storage.config";
import { PictureService } from "src/services/picture/picture.service";
import { Picture } from "src/entities/picture.entity";
import { ApiResponse } from "src/misc/api.response.class";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { runInThisContext } from "vm";
import { EditProductDto } from "src/dtos/product/edit.product.dto";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { ProductSearchDto } from "src/dtos/product/product.search.dto";

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
    },
    routes: {
        only: [
            "getOneBase",
            "getManyBase",
        ],
        getOneBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles("administrator"),
            ],
        },
        getManyBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles("administrator"),
            ],
        },
    },
})
export class ProductController {
    constructor(
        public service: ProductService,
        
        public pictureService: PictureService,
        ) { }

    
    @Post() 
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    createFullProduct(@Body() data: AddProductDto) {

        return this.service.createFullProduct(data);
    }

    
    @Patch(':id')
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    editFullProduct(@Param('id') id: number, @Body() data: EditProductDto) {
        return this.service.editFullProduct(id, data);
    }

    
    @Post(':id/uploadPicture/')
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    @UseInterceptors(
        FileInterceptor('picture', {
            storage: diskStorage({
                destination: StorageConfig.photo.destination,
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
                fileSize: StorageConfig.photo.maxSize,
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

        await this.createResizedImage(picture, StorageConfig.photo.resize.thumb);
        await this.createResizedImage(picture, StorageConfig.photo.resize.small);

        const newPicture: Picture = new Picture();
        newPicture.productId = productId;
        newPicture.imagePath = picture.filename;

       const savedPicture = await this.pictureService.add(newPicture);
       if (!savedPicture) {
           return new ApiResponse('error', -4001);
       }
       return savedPicture;
    }

    async createResizedImage(picture, resizeSettings){
        const originalFilePath = picture.path;
        const fileName = picture.filename;

        const destinationFilePath = 
        StorageConfig.photo.destination + 
        resizeSettings.directory + 
        fileName;
        
        await sharp(originalFilePath)
            .resize({
                fit: 'cover',
                width: resizeSettings.width,
                height: resizeSettings.height,
            })
            .toFile(destinationFilePath); 
    }

    @Delete(':productId/deletePicture/:pictureId')
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
        public async deletePicture(
            @Param('productId') productId: number,
            @Param('pictureId') pictureId: number,
        ) {
            const picture = await this.pictureService.findOne({
                productId: productId,
                pictureId: pictureId
            });

        if (!picture) {
                return new ApiResponse('error', -4004, 'Photo not found!');
        }

        try{
            fs.unlinkSync(StorageConfig.photo.destination + picture.imagePath);
            fs.unlinkSync(StorageConfig.photo.destination +
                StorageConfig.photo.resize.thumb.directory +
                picture.imagePath);

            fs.unlinkSync(StorageConfig.photo.destination +
                    StorageConfig.photo.resize.small.directory +
                    picture.imagePath);

        } catch (e) { }
                    
            const deleteResult = await this.pictureService.deleteById(pictureId);
            
            if (deleteResult.affected == 0) {
                return new ApiResponse('error', -4004, 'Photo not found!');
            }

            return new ApiResponse('Ok', 0, 'One photo deleted!');
        }

        @Post('search')
        @UseGuards(RoleCheckerGuard)
        @AllowToRoles('administrator')
        async search(@Body() data: ProductSearchDto): Promise <Product[] | ApiResponse> {
            return await this.service.search(data);
        }

}