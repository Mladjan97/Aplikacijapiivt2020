export class JwtRefreshDataDto {
    role: "administrator";
    administratorId: number;
    username: string;
    exp: number;
    ip: string;
    ua: string;


    toPlainObject() {
        return {
            role: this.role,
            administratorId: this.administratorId,
            username: this.username,
            exp: this.exp,
            ip: this.ip,
            ua: this.ua,
        }
    }
}