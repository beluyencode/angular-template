export interface Template {
    x: number;
    y: number;
    content: string;
    name: string;
    width: number;
    height: number;
    color: string;
    align: string;
    hidden: boolean;
    type: TypeTemplate,
    url?: string;
    id: string
}

export interface BackgroundTemplate {
    url: string,
    name: string
}

export enum TypeTemplate {
    TEXT = 'text',
    IMAGE = 'img'
}