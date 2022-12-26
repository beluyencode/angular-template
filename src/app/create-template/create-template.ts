export interface ELementType {
    name: string,
    color: string,
    fontSize: number
    content: string,
    width: number,
    type: string,
    textAlignment: string
    position: {
        top: 0,
        left: 0
    }
}

export const selectTypeElement = [
    {
        name: 'text'
    },
    {
        name: 'image'
    }
]

export const selectTextAlignment = [
    {
        name: 'left'
    },
    {
        name: 'right'
    },
    {
        name: 'center'
    }
]

export const fakeData = [
    {
        "name": "Ông/Bà :",
        "id": "63a4226a7611a8963af46677",
        "color": "",
        "fontSize": "25",
        "content": "Ông/Bà :",
        "type": "text",
        'image': null,
        "textAlignment": "left",
        "width": null,
        "position": {
            "top": 322,
            "left": 320
        }
    },
    {
        "name": "Phạm Việt Long",
        "id": "63a4226a679bdd171ee94dd2",
        "color": "",
        "fontSize": "25",
        "content": "Phạm Việt Long",
        "type": "text",
        'image': null,
        "textAlignment": "left",
        "width": null,
        "position": {
            "top": 321,
            "left": 470
        }
    },
    {
        "name": "Ngày sinh: ",
        "id": "63a4226b6d450c9857b96623",
        "color": "",
        "fontSize": "25",
        "content": "Ngày sinh: ",
        "textAlignment": "left",
        'image': null,
        "type": "text",
        "width": null,
        "position": {
            "top": 374,
            "left": 319
        }
    },
    {
        "name": "21/01/2002",
        "id": "63a4231f1ed7c63557b3840e",
        "color": "",
        "fontSize": "25",
        "content": "21/01/2002",
        "textAlignment": "left",
        "type": "text",
        'image': null,
        "width": null,
        "position": {
            "top": 374,
            "left": 469
        }
    },
    {
        "name": "Khen thưởng",
        "id": "63a42347fdfc25ea736fd9e3",
        "color": "",
        "fontSize": "25",
        "width": "750",
        "type": "text",
        "textAlignment": "center",
        'image': null,
        "content": "Đã đạt thành tích thành tích xuất sắc trong quá trình học tập và làm việc. Góp phần giúp đất nước ta sánh vai với các cường quốc năm châu.",
        "position": {
            "top": 446,
            "left": 194
        }
    }
]