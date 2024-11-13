import {Injectable} from "@nestjs/common";

@Injectable({})
export class AuthService {
    singup() {
        return {message: 'I have singed up'};
    }
    singin() {
        return {message: 'I have singed in'};
    }
}