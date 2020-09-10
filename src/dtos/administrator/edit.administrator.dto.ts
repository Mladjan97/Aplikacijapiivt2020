import * as Validator from 'class-validator';

export class EditAdministratorDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(6, 128)
    @Validator.Matches(/^.{6,128}$/, {
        message: 'Lozinka mora da sadrzi minimum 6 karaktera'
    })
    password: string;
    
}