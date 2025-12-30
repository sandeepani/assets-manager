export class Asset {
    id: number;
    name: string;
    price: number;
    boughtAt: Date;
    description?: string;

    constructor(id: number, name: string, price: number, boughtAt: Date, description?: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.boughtAt = boughtAt;
        this.description = description;
    }

    static fromJSON(json: any): Asset {
        return new Asset(
            json.id,
            json.name,
            json.price,
            new Date(json.boughtAt),
            json.description
        );
    }
}

export class AssetErrors {
    name?: string;
    price?: string;
    boughtAt?: string;
    description?: string;

    // constructor(id: number, name: string, price: number, boughtAt: Date, description?: string) {
    //     this.id = id;
    //     this.name = name;
    //     this.price = price;
    //     this.boughtAt = boughtAt;
    //     this.description = description;
    // }

    // static fromJSON(json: any): Asset {
    //     return new Asset(
    //         json.id,
    //         json.name,
    //         json.price,
    //         new Date(json.boughtAt),
    //         json.description
    //     );
    // }
}