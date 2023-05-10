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
    id: string;
    fontSize: number,
    background: string
}

export class Template implements Template {
    constructor(name: string) {
        this.x = 50;
        this.y = 50;
        this.content = '123';
        this.name = name;
        this.width = 100;
        this.height = 0;
        this.color = '#ffffff';
        this.align = TypeAlign.left;
        this.hidden = false;
        this.type = TypeTemplate.TEXT;
        this.id = ObjectId();
        this.fontSize = 14;
        this.background = 'transparent'
    }
}

export function ObjectId(m = Math, d = Date, h = 16, s = (sELe: any) => m.floor(sELe).toString(h)) {
    return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
}

export interface BackgroundTemplate {
    url: string,
    name: string
}

export class BackgroundTemplate {
    constructor() {
        this.name = 'background';
        this.url = './../../../../assets/create-template/background.jpg'
    }
}

export enum TypeTemplate {
    TEXT = 'text',
    IMAGE = 'img'
}

export enum TypeAction {
    CHANGE = 'change',
    DELETE = 'delete',
    ADD = 'add'
}


export enum TypeAlign {
    CENTER = 'center',
    RIGHT = 'right',
    left = 'left'
}