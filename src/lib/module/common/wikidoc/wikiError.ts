export class WikiError extends Error{
    code: string;

    constructor(code: string, msg?: string){
        super(msg);
        this.code = code;
    }
}