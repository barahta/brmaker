import style from './EditElementWin.module.scss'
import {useEffect, useState} from "react";

function ElemEditor({element}){
    // console.log(element)
    const [kit, setKit] = useState({
        view: {
            active: 1,
            title: 'Видимость элемента',
            content: 1,
        },
        description: {
            active: 1,
            title: 'Описание',
            content: []
        },
        editortable: {
            active: 1,
            title: 'Редактировать таблицу',
            content: []
        },
        value: {
            active: 1,
            title: 'Значение',
            content: ''
        },
        clue: {
            active: 1,
            title: 'Подсказка',
            content: ''
        },
        sizeX: {
            active: 1,
            title: 'Ширина (px)',
            content: 0
        },
        sizeY: {
            active: 1,
            title: 'Высота (px)',
            content: 0
        },
        dateStat: {
            active: 1,
            title: 'Дата',
            content: '01:01:1970'
        },
        timeStat: {
            active: 1,
            title: 'Дата',
            content: '12:30'
        },
        required: {
            active: 1,
            title: 'Обязательное поле',
            content: 1
        },
        modification: {
            active: 1,
            title: '',
            content: [
                {
                    on: 0,
                    form: 1
                },
                {
                    on: 0,
                    form: 2
                },
                {
                    on: 0,
                    form: 3
                },
                {
                    on: 0,
                    form: 4
                },
                {
                    on: 0,
                    form: 5
                },
                {
                    on: 0,
                    form: 6
                },
                {
                    on: 0,
                    form: 7
                }
            ]
        },
        colorText: {
            active: 1,
            title: 'Цвет текста',
            content: '#454545'
        },
        colorBack: {
            active: 1,
            title: 'Цвет фона',
            content: '#F5DB1D'
        },
        icon: {
            active: 1,
            title: 'Иконка',
            content: ''
        },
        selections: {
            active: 1,
            title: 'Варианты',
            content: []
        },
        connects:{
            active: 1,
            title: 'Связать',
            content: 0
        },
        delElement: {
            active: 1,
            title: 'Удалить элемент',
            content: ''
        }
    })
    const [elem, setElem] = useState(1)

    const editor = [
        {
            view: {
                active: 1,
                title: 'Видимость элемента',
                content: 1,
            },
            description: {
                active: 0,
                title: 'Описание',
                content: []
            },
            editortable: {
                active: 0,
                title: 'Редактировать таблицу',
                content: []
            },
            value: {
                active: 0,
                title: 'Значение',
                content: ''
            },
            clue: {
                active: 0,
                title: 'Подсказка',
                content: ''
            },
            sizeX: {
                active: 0,
                title: 'Ширина (px)',
                content: 0
            },
            sizeY: {
                active: 0,
                title: 'Высота (px)',
                content: 0
            },
            dateStat: {
                active: 0,
                title: 'Дата',
                content: '01:01:1970'
            },
            timeStat: {
                active: 0,
                title: 'Дата',
                content: '12:30'
            },
            required: {
                active: 0,
                title: 'Обязательное поле',
                content: 1
            },
            modification: {
                active: 0,
                title: '',
                content: [
                    {
                        on: 0,
                        form: 1
                    },
                    {
                        on: 0,
                        form: 2
                    },
                    {
                        on: 0,
                        form: 3
                    },
                    {
                        on: 0,
                        form: 4
                    },
                    {
                        on: 0,
                        form: 5
                    },
                    {
                        on: 0,
                        form: 6
                    },
                    {
                        on: 0,
                        form: 7
                    }
                ]
            },
            colorText: {
                active: 0,
                title: 'Цвет текста',
                content: '#454545'
            },
            colorBack: {
                active: 0,
                title: 'Цвет фона',
                content: '#F5DB1D'
            },
            icon: {
                active: 0,
                title: 'Иконка',
                content: ''
            },
            selections: {
                active: 0,
                title: 'Варианты',
                content: []
            },
            connects:{
                active: 0,
                title: 'Связать',
                content: 0
            },
            delElement: {
                active: 0,
                title: 'Удалить элемент',
                content: ''
            }
        },
        {
            view: {
                active: 1,
                title: 'Видимость элемента',
                content: 1,
            },
            description: {
                active: 1,
                title: 'Описание',
                content: []
            },
            editortable: {
                active: 0,
                title: 'Редактировать таблицу',
                content: []
            },
            value: {
                active: 1,
                title: 'Значение',
                content: ''
            },
            clue: {
                active: 0,
                title: 'Подсказка',
                content: ''
            },
            sizeX: {
                active: 1,
                title: 'Ширина (px)',
                content: 0
            },
            sizeY: {
                active: 1,
                title: 'Высота (px)',
                content: 0
            },
            dateStat: {
                active: 0,
                title: 'Дата',
                content: '01:01:1970'
            },
            timeStat: {
                active: 0,
                title: 'Дата',
                content: '12:30'
            },
            required: {
                active: 0,
                title: 'Обязательное поле',
                content: 1
            },
            modification: {
                active: 0,
                title: '',
                content: [
                    {
                        on: 0,
                        form: 1
                    },
                    {
                        on: 0,
                        form: 2
                    },
                    {
                        on: 0,
                        form: 3
                    },
                    {
                        on: 0,
                        form: 4
                    },
                    {
                        on: 0,
                        form: 5
                    },
                    {
                        on: 0,
                        form: 6
                    },
                    {
                        on: 0,
                        form: 7
                    }
                ]
            },
            colorText: {
                active: 1,
                title: 'Цвет текста',
                content: '#454545'
            },
            colorBack: {
                active: 1,
                title: 'Цвет фона',
                content: '#F5DB1D'
            },
            icon: {
                active: 1,
                title: 'Иконка',
                content: ''
            },
            selections: {
                active: 0,
                title: 'Варианты',
                content: []
            },
            connects:{
                active: 1,
                title: 'Связать',
                content: 0
            },
            delElement: {
                active: 1,
                title: 'Удалить элемент',
                content: ''
            }
        },
        {
            view: {
                active: 1,
                title: 'Видимость элемента',
                content: 1,
            },
            description: {
                active: 1,
                title: 'Описание',
                content: []
            },
            editortable: {
                active: 0,
                title: 'Редактировать таблицу',
                content: []
            },
            value: {
                active: 1,
                title: 'Значение',
                content: ''
            },
            clue: {
                active: 0,
                title: 'Подсказка',
                content: ''
            },
            sizeX: {
                active: 1,
                title: 'Ширина (px)',
                content: 0
            },
            sizeY: {
                active: 1,
                title: 'Высота (px)',
                content: 0
            },
            dateStat: {
                active: 0,
                title: 'Дата',
                content: '01:01:1970'
            },
            timeStat: {
                active: 0,
                title: 'Дата',
                content: '12:30'
            },
            required: {
                active: 0,
                title: 'Обязательное поле',
                content: 1
            },
            modification: {
                active: 0,
                title: '',
                content: [
                    {
                        on: 0,
                        form: 1
                    },
                    {
                        on: 0,
                        form: 2
                    },
                    {
                        on: 0,
                        form: 3
                    },
                    {
                        on: 0,
                        form: 4
                    },
                    {
                        on: 0,
                        form: 5
                    },
                    {
                        on: 0,
                        form: 6
                    },
                    {
                        on: 0,
                        form: 7
                    }
                ]
            },
            colorText: {
                active: 1,
                title: 'Цвет текста',
                content: '#454545'
            },
            colorBack: {
                active: 1,
                title: 'Цвет фона',
                content: '#F5DB1D'
            },
            icon: {
                active: 1,
                title: 'Иконка',
                content: ''
            },
            selections: {
                active: 0,
                title: 'Варианты',
                content: []
            },
            connects:{
                active: 1,
                title: 'Связать',
                content: 0
            },
            delElement: {
                active: 1,
                title: 'Удалить элемент',
                content: ''
            }
        },
        {
            view: {
                active: 1,
                title: 'Видимость элемента',
                content: 1,
            },
            description: {
                active: 1,
                title: 'Описание',
                content: []
            },
            editortable: {
                active: 0,
                title: 'Редактировать таблицу',
                content: []
            },
            value: {
                active: 1,
                title: 'Значение',
                content: ''
            },
            clue: {
                active: 0,
                title: 'Подсказка',
                content: ''
            },
            sizeX: {
                active: 1,
                title: 'Ширина (px)',
                content: 0
            },
            sizeY: {
                active: 1,
                title: 'Высота (px)',
                content: 0
            },
            dateStat: {
                active: 0,
                title: 'Дата',
                content: '01:01:1970'
            },
            timeStat: {
                active: 0,
                title: 'Дата',
                content: '12:30'
            },
            required: {
                active: 0,
                title: 'Обязательное поле',
                content: 1
            },
            modification: {
                active: 0,
                title: '',
                content: [
                    {
                        on: 0,
                        form: 1
                    },
                    {
                        on: 0,
                        form: 2
                    },
                    {
                        on: 0,
                        form: 3
                    },
                    {
                        on: 0,
                        form: 4
                    },
                    {
                        on: 0,
                        form: 5
                    },
                    {
                        on: 0,
                        form: 6
                    },
                    {
                        on: 0,
                        form: 7
                    }
                ]
            },
            colorText: {
                active: 1,
                title: 'Цвет текста',
                content: '#454545'
            },
            colorBack: {
                active: 1,
                title: 'Цвет фона',
                content: '#F5DB1D'
            },
            icon: {
                active: 1,
                title: 'Иконка',
                content: ''
            },
            selections: {
                active: 0,
                title: 'Варианты',
                content: []
            },
            connects:{
                active: 1,
                title: 'Связать',
                content: 0
            },
            delElement: {
                active: 1,
                title: 'Удалить элемент',
                content: ''
            }
        },
        {
            view: {
                active: 1,
                title: 'Видимость элемента',
                content: 1,
            },
            description: {
                active: 1,
                title: 'Описание',
                content: []
            },
            editortable: {
                active: 0,
                title: 'Редактировать таблицу',
                content: []
            },
            value: {
                active: 0,
                title: 'Значение',
                content: ''
            },
            clue: {
                active: 0,
                title: 'Подсказка',
                content: ''
            },
            sizeX: {
                active: 0,
                title: 'Ширина (px)',
                content: 0
            },
            sizeY: {
                active: 0,
                title: 'Высота (px)',
                content: 0
            },
            dateStat: {
                active: 0,
                title: 'Дата',
                content: '01:01:1970'
            },
            timeStat: {
                active: 0,
                title: 'Дата',
                content: '12:30'
            },
            required: {
                active: 0,
                title: 'Обязательное поле',
                content: 1
            },
            modification: {
                active: 0,
                title: '',
                content: [
                    {
                        on: 0,
                        form: 1
                    },
                    {
                        on: 0,
                        form: 2
                    },
                    {
                        on: 0,
                        form: 3
                    },
                    {
                        on: 0,
                        form: 4
                    },
                    {
                        on: 0,
                        form: 5
                    },
                    {
                        on: 0,
                        form: 6
                    },
                    {
                        on: 0,
                        form: 7
                    }
                ]
            },
            colorText: {
                active: 0,
                title: 'Цвет текста',
                content: '#454545'
            },
            colorBack: {
                active: 0,
                title: 'Цвет фона',
                content: '#F5DB1D'
            },
            icon: {
                active: 1,
                title: 'Иконка',
                content: ''
            },
            selections: {
                active: 0,
                title: 'Варианты',
                content: []
            },
            connects:{
                active: 1,
                title: 'Связать',
                content: 0
            },
            delElement: {
                active: 1,
                title: 'Удалить элемент',
                content: ''
            }
        },
        {
            view: {
                active: 1,
                title: 'Видимость элемента',
                content: 1,
            },
            description: {
                active: 1,
                title: 'Описание',
                content: []
            },
            editortable: {
                active: 0,
                title: 'Редактировать таблицу',
                content: []
            },
            value: {
                active: 0,
                title: 'Значение',
                content: ''
            },
            clue: {
                active: 0,
                title: 'Подсказка',
                content: ''
            },
            sizeX: {
                active: 0,
                title: 'Ширина (px)',
                content: 0
            },
            sizeY: {
                active: 0,
                title: 'Высота (px)',
                content: 0
            },
            dateStat: {
                active: 0,
                title: 'Дата',
                content: '01:01:1970'
            },
            timeStat: {
                active: 0,
                title: 'Дата',
                content: '12:30'
            },
            required: {
                active: 0,
                title: 'Обязательное поле',
                content: 1
            },
            modification: {
                active: 0,
                title: '',
                content: [
                    {
                        on: 0,
                        form: 1
                    },
                    {
                        on: 0,
                        form: 2
                    },
                    {
                        on: 0,
                        form: 3
                    },
                    {
                        on: 0,
                        form: 4
                    },
                    {
                        on: 0,
                        form: 5
                    },
                    {
                        on: 0,
                        form: 6
                    },
                    {
                        on: 0,
                        form: 7
                    }
                ]
            },
            colorText: {
                active: 0,
                title: 'Цвет текста',
                content: '#454545'
            },
            colorBack: {
                active: 0,
                title: 'Цвет фона',
                content: '#F5DB1D'
            },
            icon: {
                active: 1,
                title: 'Иконка',
                content: ''
            },
            selections: {
                active: 0,
                title: 'Варианты',
                content: []
            },
            connects:{
                active: 1,
                title: 'Связать',
                content: 0
            },
            delElement: {
                active: 1,
                title: 'Удалить элемент',
                content: ''
            }
        },
        {
            view: {
                active: 1,
                title: 'Видимость элемента',
                content: 1,
            },
            description: {
                active: 1,
                title: 'Описание',
                content: []
            },
            editortable: {
                active: 0,
                title: 'Редактировать таблицу',
                content: []
            },
            value: {
                active: 0,
                title: 'Значение',
                content: ''
            },
            clue: {
                active: 0,
                title: 'Подсказка',
                content: ''
            },
            sizeX: {
                active: 0,
                title: 'Ширина (px)',
                content: 0
            },
            sizeY: {
                active: 0,
                title: 'Высота (px)',
                content: 0
            },
            dateStat: {
                active: 0,
                title: 'Дата',
                content: '01:01:1970'
            },
            timeStat: {
                active: 0,
                title: 'Дата',
                content: '12:30'
            },
            required: {
                active: 0,
                title: 'Обязательное поле',
                content: 1
            },
            modification: {
                active: 0,
                title: '',
                content: [
                    {
                        on: 0,
                        form: 1
                    },
                    {
                        on: 0,
                        form: 2
                    },
                    {
                        on: 0,
                        form: 3
                    },
                    {
                        on: 0,
                        form: 4
                    },
                    {
                        on: 0,
                        form: 5
                    },
                    {
                        on: 0,
                        form: 6
                    },
                    {
                        on: 0,
                        form: 7
                    }
                ]
            },
            colorText: {
                active: 0,
                title: 'Цвет текста',
                content: '#454545'
            },
            colorBack: {
                active: 0,
                title: 'Цвет фона',
                content: '#F5DB1D'
            },
            icon: {
                active: 1,
                title: 'Иконка',
                content: ''
            },
            selections: {
                active: 0,
                title: 'Варианты',
                content: []
            },
            connects:{
                active: 1,
                title: 'Связать',
                content: 0
            },
            delElement: {
                active: 1,
                title: 'Удалить элемент',
                content: ''
            }
        },
        {
            view: {
                active: 1,
                title: 'Видимость элемента',
                content: 1,
            },
            description: {
                active: 1,
                title: 'Описание',
                content: []
            },
            editortable: {
                active: 0,
                title: 'Редактировать таблицу',
                content: []
            },
            value: {
                active: 0,
                title: 'Значение',
                content: ''
            },
            clue: {
                active: 0,
                title: 'Подсказка',
                content: ''
            },
            sizeX: {
                active: 0,
                title: 'Ширина (px)',
                content: 0
            },
            sizeY: {
                active: 0,
                title: 'Высота (px)',
                content: 0
            },
            dateStat: {
                active: 0,
                title: 'Дата',
                content: '01:01:1970'
            },
            timeStat: {
                active: 0,
                title: 'Дата',
                content: '12:30'
            },
            required: {
                active: 0,
                title: 'Обязательное поле',
                content: 1
            },
            modification: {
                active: 0,
                title: '',
                content: [
                    {
                        on: 0,
                        form: 1
                    },
                    {
                        on: 0,
                        form: 2
                    },
                    {
                        on: 0,
                        form: 3
                    },
                    {
                        on: 0,
                        form: 4
                    },
                    {
                        on: 0,
                        form: 5
                    },
                    {
                        on: 0,
                        form: 6
                    },
                    {
                        on: 0,
                        form: 7
                    }
                ]
            },
            colorText: {
                active: 0,
                title: 'Цвет текста',
                content: '#454545'
            },
            colorBack: {
                active: 0,
                title: 'Цвет фона',
                content: '#F5DB1D'
            },
            icon: {
                active: 1,
                title: 'Иконка',
                content: ''
            },
            selections: {
                active: 0,
                title: 'Варианты',
                content: []
            },
            connects:{
                active: 1,
                title: 'Связать',
                content: 0
            },
            delElement: {
                active: 1,
                title: 'Удалить элемент',
                content: ''
            }
        },
        {
            view: {
                active: 1,
                title: 'Видимость элемента',
                content: 1,
            },
            description: {
                active: 1,
                title: 'Описание',
                content: []
            },
            editortable: {
                active: 0,
                title: 'Редактировать таблицу',
                content: []
            },
            value: {
                active: 0,
                title: 'Значение',
                content: ''
            },
            clue: {
                active: 0,
                title: 'Подсказка',
                content: ''
            },
            sizeX: {
                active: 0,
                title: 'Ширина (px)',
                content: 0
            },
            sizeY: {
                active: 0,
                title: 'Высота (px)',
                content: 0
            },
            dateStat: {
                active: 0,
                title: 'Дата',
                content: '01:01:1970'
            },
            timeStat: {
                active: 0,
                title: 'Дата',
                content: '12:30'
            },
            required: {
                active: 0,
                title: 'Обязательное поле',
                content: 1
            },
            modification: {
                active: 0,
                title: '',
                content: [
                    {
                        on: 0,
                        form: 1
                    },
                    {
                        on: 0,
                        form: 2
                    },
                    {
                        on: 0,
                        form: 3
                    },
                    {
                        on: 0,
                        form: 4
                    },
                    {
                        on: 0,
                        form: 5
                    },
                    {
                        on: 0,
                        form: 6
                    },
                    {
                        on: 0,
                        form: 7
                    }
                ]
            },
            colorText: {
                active: 0,
                title: 'Цвет текста',
                content: '#454545'
            },
            colorBack: {
                active: 0,
                title: 'Цвет фона',
                content: '#F5DB1D'
            },
            icon: {
                active: 0,
                title: 'Иконка',
                content: ''
            },
            selections: {
                active: 1,
                title: 'Варианты',
                content: []
            },
            connects:{
                active: 1,
                title: 'Связать',
                content: 0
            },
            delElement: {
                active: 1,
                title: 'Удалить элемент',
                content: ''
            }
        },
        {
            view: {
                active: 1,
                title: 'Видимость элемента',
                content: 1,
            },
            description: {
                active: 1,
                title: 'Описание',
                content: []
            },
            editortable: {
                active: 1,
                title: 'Редактировать отборы',
                content: []
            },
            value: {
                active: 0,
                title: 'Значение',
                content: ''
            },
            clue: {
                active: 0,
                title: 'Подсказка',
                content: ''
            },
            sizeX: {
                active: 0,
                title: 'Ширина (px)',
                content: 0
            },
            sizeY: {
                active: 0,
                title: 'Высота (px)',
                content: 0
            },
            dateStat: {
                active: 0,
                title: 'Дата',
                content: '01:01:1970'
            },
            timeStat: {
                active: 0,
                title: 'Дата',
                content: '12:30'
            },
            required: {
                active: 0,
                title: 'Обязательное поле',
                content: 1
            },
            modification: {
                active: 0,
                title: '',
                content: [
                    {
                        on: 0,
                        form: 1
                    },
                    {
                        on: 0,
                        form: 2
                    },
                    {
                        on: 0,
                        form: 3
                    },
                    {
                        on: 0,
                        form: 4
                    },
                    {
                        on: 0,
                        form: 5
                    },
                    {
                        on: 0,
                        form: 6
                    },
                    {
                        on: 0,
                        form: 7
                    }
                ]
            },
            colorText: {
                active: 0,
                title: 'Цвет текста',
                content: '#454545'
            },
            colorBack: {
                active: 0,
                title: 'Цвет фона',
                content: '#F5DB1D'
            },
            icon: {
                active: 0,
                title: 'Иконка',
                content: ''
            },
            selections: {
                active: 0,
                title: 'Варианты',
                content: []
            },
            connects:{
                active: 1,
                title: 'Связать',
                content: 0
            },
            delElement: {
                active: 1,
                title: 'Удалить элемент',
                content: ''
            }
        },
        {
            view: {
                active: 1,
                title: 'Видимость элемента',
                content: 1,
            },
            description: {
                active: 1,
                title: 'Описание',
                content: []
            },
            editortable: {
                active: 1,
                title: 'Редактировать таблицу',
                content: []
            },
            value: {
                active: 0,
                title: 'Значение',
                content: ''
            },
            clue: {
                active: 0,
                title: 'Подсказка',
                content: ''
            },
            sizeX: {
                active: 0,
                title: 'Ширина (px)',
                content: 0
            },
            sizeY: {
                active: 0,
                title: 'Высота (px)',
                content: 0
            },
            dateStat: {
                active: 0,
                title: 'Дата',
                content: '01:01:1970'
            },
            timeStat: {
                active: 0,
                title: 'Дата',
                content: '12:30'
            },
            required: {
                active: 0,
                title: 'Обязательное поле',
                content: 1
            },
            modification: {
                active: 0,
                title: '',
                content: [
                    {
                        on: 0,
                        form: 1
                    },
                    {
                        on: 0,
                        form: 2
                    },
                    {
                        on: 0,
                        form: 3
                    },
                    {
                        on: 0,
                        form: 4
                    },
                    {
                        on: 0,
                        form: 5
                    },
                    {
                        on: 0,
                        form: 6
                    },
                    {
                        on: 0,
                        form: 7
                    }
                ]
            },
            colorText: {
                active: 0,
                title: 'Цвет текста',
                content: '#454545'
            },
            colorBack: {
                active: 0,
                title: 'Цвет фона',
                content: '#F5DB1D'
            },
            icon: {
                active: 0,
                title: 'Иконка',
                content: ''
            },
            selections: {
                active: 0,
                title: 'Варианты',
                content: []
            },
            connects:{
                active: 1,
                title: 'Связать',
                content: 0
            },
            delElement: {
                active: 1,
                title: 'Удалить элемент',
                content: ''
            }
        },
        {
            view: {
                active: 1,
                title: 'Видимость элемента',
                content: 1,
            },
            description: {
                active: 1,
                title: 'Описание',
                content: []
            },
            editortable: {
                active: 1,
                title: 'Редактировать таблицу',
                content: []
            },
            value: {
                active: 0,
                title: 'Значение',
                content: ''
            },
            clue: {
                active: 0,
                title: 'Подсказка',
                content: ''
            },
            sizeX: {
                active: 0,
                title: 'Ширина (px)',
                content: 0
            },
            sizeY: {
                active: 0,
                title: 'Высота (px)',
                content: 0
            },
            dateStat: {
                active: 0,
                title: 'Дата',
                content: '01:01:1970'
            },
            timeStat: {
                active: 0,
                title: 'Дата',
                content: '12:30'
            },
            required: {
                active: 0,
                title: 'Обязательное поле',
                content: 1
            },
            modification: {
                active: 0,
                title: '',
                content: [
                    {
                        on: 0,
                        form: 1
                    },
                    {
                        on: 0,
                        form: 2
                    },
                    {
                        on: 0,
                        form: 3
                    },
                    {
                        on: 0,
                        form: 4
                    },
                    {
                        on: 0,
                        form: 5
                    },
                    {
                        on: 0,
                        form: 6
                    },
                    {
                        on: 0,
                        form: 7
                    }
                ]
            },
            colorText: {
                active: 0,
                title: 'Цвет текста',
                content: '#454545'
            },
            colorBack: {
                active: 0,
                title: 'Цвет фона',
                content: '#F5DB1D'
            },
            icon: {
                active: 0,
                title: 'Иконка',
                content: ''
            },
            selections: {
                active: 0,
                title: 'Варианты',
                content: []
            },
            connects:{
                active: 1,
                title: 'Связать',
                content: 0
            },
            delElement: {
                active: 1,
                title: 'Удалить элемент',
                content: ''
            }
        }
    ]
    useEffect(()=>{
        setElem(+element.editor)
        console.log(kit)
        // setKit(editor[+element.editor])
    }, [+element.editor])
    if(elem === 0){
        return (
            <div className={style.top}>
                {(kit.view.active)??<div>видимость</div>}
            </div>
        )
    }
    if(elem === 1){
        return (
            <div className={style.top}>
                {(kit.view.active)&&<div className={style.view}>
                    <div className={style.view_tit}>{kit.view.title}</div>
                    <div className={style.tumbler}><div className={style.tumbler_box}></div></div>
                </div>}
                {(kit.description.active)&&<div className={style.description}>
                    <div className={style.icon}>
                        <i className="fa-solid fa-newspaper"/>
                    </div>
                    <div className={style.name}>
                        {kit.description.title}
                    </div>
                </div>}
                {(kit.editortable.active)&&<div className={style.editortable}>
                    {kit.editortable.title}
                </div>}
                {(kit.value.active)&&<div className={style.value}>
                    <div className={style.name}>{kit.value.title}</div>
                    <input type="text"/>
                </div>}
                {(kit.clue.active)&&<div className={style.clue}>
                    <div className={style.name}>{kit.clue.title}</div>
                    <input type="text"/>
                </div>}
                {(kit.sizeX.active)&&<div className={style.sizeX}>
                    <div className={style.name}>{kit.sizeX.title}</div>
                    <input type="number"/>
                </div>}
                {(kit.sizeY.active)&&<div className={style.sizeY}>
                    <div className={style.name}>{kit.sizeY.title}</div>
                    <input type="number"/>
                </div>}
                {(kit.dateStat.active)&&<div className={style.dateStat}>
                    <div className={style.name}>{kit.dateStat.title}</div>
                    <input type="date"/>
                </div>}
                {(kit.timeStat.active)&&<div className={style.timeStat}>
                    <div className={style.name}>{kit.timeStat.title}</div>
                    <input type="time"/>
                </div>}
                {(kit.required.active)&&<div className={style.required}>
                    <div className={style.checkbox}>
                        <div className={style.checkactive}></div>
                    </div>
                    <div className={style.name}>{kit.required.title}</div>
                </div>}
                {(kit.modification.active)&&<div className={style.modification}>
                    {kit.modification.content.map((btn, indexLine)=>(
                        <div key={indexLine} className={style.btnline}>
                            <div className={style.checkbox}>
                                <div className={style.checkactive}></div>
                            </div>
                        </div>
                    ))}
                </div>}
                {(kit.colorText.active)&&<div>{kit.colorText.title}</div>}
                {(kit.colorBack.active)&&<div>{kit.colorBack.title}</div>}
                {(kit.icon.active)&&<div>{kit.icon.title}</div>}
                {(kit.selections.active)&&<div>{kit.selections.title}</div>}
                {(kit.connects.active)&&<div>{kit.connects.title}</div>}
                {(kit.delElement.active)&&<div>{kit.delElement.title}</div>}
            </div>
        )
    }
    if(elem === 2){
        return (
            <div className={style.top}>
                2
            </div>
        )
    }
    if(elem === 3){
        return (
            <div className={style.top}>
                3
            </div>
        )
    }
    if(elem === 4){
        return (
            <div className={style.top}>
                4
            </div>
        )
    }
    if(elem === 5){
        return (
            <div className={style.top}>
                5
            </div>
        )
    }
    if(elem === 6){
        return (
            <div className={style.top}>
                6
            </div>
        )
    }
    if(elem === 7){
        return (
            <div className={style.top}>
                7
            </div>
        )
    }
    if(elem === 8){
        return (
            <div className={style.top}>
                8
            </div>
        )
    }
    if(elem === 9){
        return (
            <div className={style.top}>
                9
            </div>
        )
    }
    if(elem === 10){
        return (
            <div className={style.top}>
                10
            </div>
        )
    }
    if(elem === 11){
        return (
            <div className={style.top}>
                11
            </div>
        )
    }

}

function EditElementWin({winEditEnter, setWinEditEnter, elements, setElements, editElem, setEditElem,winEditBlock,setWinEditBlock}){


    const deleteElement = () => {
        const newarr = [...elements]
        const newArray = newarr.filter(element => element.id !== editElem.id)
        setElements(newArray)
        setWinEditEnter(false)
    }

    return(
        <div className={`${style.main} ${winEditEnter ? style.open : ''}`}>
            {/*<div className={style.exit} onClick={()=>{setWinEditEnter(false)}}><i className="fa-solid fa-xmark"/></div>*/}
            {/*<div className={style.top}>*/}
                <ElemEditor element={editElem}/>
                {/*<div className={style.button} onClick={()=>setWinEditBlock(true)}><i className="fa-regular fa-pen-to-square"></i></div>*/}
                {/*<div className={style.button}><i className="fa-solid fa-newspaper"></i></div>*/}
                {/*<div className={style.inputblock}>*/}
                {/*    <div className={style.title}>положение X</div>*/}
                {/*    <input type="number" className={style.intext}/>*/}
                {/*</div>*/}
                {/*<div className={style.inputblock}>*/}
                {/*    <div className={style.title}>положение Y</div>*/}
                {/*    <input type="number" className={style.intext}/>*/}
                {/*</div>*/}
            {/*</div>*/}
            <div className={style.down}>
                {/*<div className={style.button} onClick={deleteElement}><i className="fa-solid fa-trash-can"></i></div>*/}
            </div>




        </div>
    )
}

export default EditElementWin