export class JwtDataAdministratorDto {
    role: "administrator";
    id: number;
    username: string;
    exp: number;
    ip: string;
    ua: string;


    toPlainObject() {
        return {
            role: this.role,
            id: this.id,
            username: this.username,
            exp: this.exp,
            ip: this.ip,
            ua: this.ua,
        }
    }
}