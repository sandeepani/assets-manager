export interface Asset {
    id: number;
    name: string;
    price: number;
    boughtAt: Date;
    description?: string;
}