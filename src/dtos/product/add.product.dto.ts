import * as Validator from 'class-validator';

export class AddProductDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(5, 32)
    title: string;
    
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(32, 255)
    description: string;

    categoryId: number;
    
    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
    price: number;

    productMaterialId: number;

  //   @Validator.IsNotEmpty()
  //   @Validator.IsPositive()
  //   @Validator.IsNumber({
  //     allowInfinity: false,
  //     allowNaN: false,
  //     maxDecimalPlaces: 0,
  //   })
  //   quantity: number;

  //   @Validator.IsNotEmpty()
  //   @Validator.IsPositive()
  //   @Validator.IsNumber({
  //   allowInfinity: false,
  //   allowNaN: false,
  //   maxDecimalPlaces: 0,
  // })
  //   size: number;

  //   @Validator.IsNotEmpty()
  //   @Validator.IsString()
  //   @Validator.Length(3,50)
  //   color: string;
}