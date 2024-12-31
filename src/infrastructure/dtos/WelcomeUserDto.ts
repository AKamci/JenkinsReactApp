export interface WelcomeUserDto {
    _class: string;
    anonymous: boolean;
    authenticated: boolean;
    authorities: string[];
    name: string;
}