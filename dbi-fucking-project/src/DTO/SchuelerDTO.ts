
export class SchuelerDTO {
    public _id: string;
    public S_Vorname: string;
    public S_Zuname: string;
    public S_Nr: number;

    constructor(id: string, S_Vorname: string, S_Zuname: string, S_Nr: number) {
        this._id = id;
        this.S_Nr = S_Nr;
        this.S_Zuname = S_Zuname;
        this.S_Vorname = S_Vorname;
    }
}

function isSchueler(obj): obj is SchuelerDTO {
    return obj &&
        typeof obj.id === 'string'  &&
        typeof obj.S_Vorname === 'string' &&
        typeof obj.S_Zuname === 'string' &&
        typeof obj.S_Nr === 'number';
}

