import style from './EditElementWin.module.scss'
import {useEffect, useState} from "react";

function ElemEditor({element,winEditEnter,setWinEditEnter,elements,setElements,editElem,setEditElem,winEditBlock,setWinEditBlock}){

    const [thisElem, setThisElem] = useState({})
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

    const delElem = (id) => {
        let newElements = [...elements]
        const resultElements = newElements.filter(elem => elem.id !== id)
        setElements(resultElements)
        setEditElem('')
    }

    useEffect(()=>{
        setElem(+element.editor)
        setThisElem(element)
        console.log(element)
        console.log(elements)
        // setKit(editor[+element.editor])
    }, [+element.editor])
    if(elem === 0){
        return (
            <div className={style.top}>
                {(thisElem.settings.view.active)??<div>видимость</div>}
            </div>
        )
    }
    if(elem === 1 && thisElem.settings){
        return (
            <div className={style.top}>
                {(thisElem.settings.view.active)?<div className={style.view} style={(thisElem.settings.view.active)?{}:{display: 'none'}}>
                    <div className={style.view_tit}>{thisElem.settings.view.title}</div>
                    <div className={style.tumbler}><div className={style.tumbler_box}></div></div>
                </div>:''}
                {(thisElem.settings.description.active)?<div className={style.description} style={(thisElem.settings.description.active)?{}:{display: 'none'}}>
                    <div className={style.icon}>
                        <i className="fa-solid fa-newspaper"/>
                    </div>
                    <div className={style.name}>
                        {thisElem.settings.description.title}
                    </div>
                </div>:''}
                {(thisElem.settings.editortable.active)?<div className={style.editortable} style={(thisElem.settings.editortable.active === 1)?{}:{display: 'none'}}>
                    {(thisElem.settings.editortable.active === 1)?thisElem.settings.editortable.title:''}
                </div>:''}
                {(thisElem.settings.value.active)?<div className={style.value} style={(thisElem.settings.value.active)?{}:{display: 'none'}}>
                    <div className={style.name}>{thisElem.settings.value.title}</div>
                    <input type="text"/>
                </div>:''}
                {(thisElem.settings.clue.active)?<div className={style.clue} style={(thisElem.settings.clue.active)?{}:{display: 'none'}}>
                    <div className={style.name}>{thisElem.settings.clue.title}</div>
                    <input type="text"/>
                </div>:''}
                {(thisElem.settings.sizeX.active)?<div className={style.sizeX} style={(thisElem.settings.sizeX.active)?{}:{display: 'none'}}>
                    <div className={style.name}>{thisElem.settings.sizeX.title}</div>
                    <input type="number"/>
                </div>:''}
                {(thisElem.settings.sizeY.active)?<div className={style.sizeY} style={(thisElem.settings.sizeY.active)?{}:{display: 'none'}}>
                    <div className={style.name}>{thisElem.settings.sizeY.title}</div>
                    <input type="number"/>
                </div>:''}
                {(thisElem.settings.dateStat.active)?<div className={style.dateStat} style={(thisElem.settings.dateStat.active)?{}:{display: 'none'}}>
                    <div className={style.name}>{thisElem.settings.dateStat.title}</div>
                    <input type="date"/>
                </div>:''}
                {(thisElem.settings.timeStat.active)?<div className={style.timeStat} style={(thisElem.settings.timeStat.active)?{}:{display: 'none'}}>
                    <div className={style.name}>{thisElem.settings.timeStat.title}</div>
                    <input type="time"/>
                </div>:''}
                {(thisElem.settings.required.active)?<div className={style.required} style={(thisElem.settings.required.active)?{}:{display: 'none'}}>
                    <div className={style.checkbox}>
                        <div className={style.checkactive}></div>
                    </div>
                    <div className={style.name}>{thisElem.settings.required.title}</div>
                </div>:''}
                {(thisElem.settings.modification.active)?<div className={style.modification} style={(thisElem.settings.modification.active)?{}:{display: 'none'}}>
                    {thisElem.settings.modification.content.map((btn, indexLine)=>(
                        <div key={indexLine} className={style.btnline}>
                            <div className={style.checkbox}>
                                <div className={style.checkactive}></div>
                            </div>
                        </div>
                    ))}
                </div>:''}
                {(thisElem.settings.colorText.active)?<div className={style.colorText} style={(thisElem.settings.colorText.active)?{}:{display: 'none'}}>
                    <div className={style.name}>{thisElem.settings.colorText.title}</div>
                    <div className={style.contentbox}>
                        <div className={style.colorBox} style={{backgroundColor: `${thisElem.settings.colorText.content}`}}></div>
                        <div  className={style.cleanBTN}>Очистить</div>
                    </div>
                </div>:''}
                {(thisElem.settings.colorBack.active)?<div className={style.colorText} style={(thisElem.settings.colorBack.active)?{}:{display: 'none'}}>
                    <div className={style.name}>{thisElem.settings.colorBack.title}</div>
                    <div className={style.contentbox}>
                        <div className={style.colorBox} style={{backgroundColor: `${thisElem.settings.colorBack.content}`}}></div>
                        <div className={style.cleanBTN}>Очистить</div>
                    </div>
                </div>:''}
                {(thisElem.settings.icon.active)?<div className={style.colorText} style={(thisElem.settings.icon.active)?{}:{display: 'none'}}>
                    <div className={style.name}>{thisElem.settings.icon.title}</div>
                    <div className={style.contentbox}>
                        <div className={style.colorBox} style={{backgroundColor: `${thisElem.settings.icon.content}`}}></div>
                        <div className={style.cleanBTN}>Очистить</div>
                    </div>
                </div>:''}
                {(thisElem.settings.selections.active)?
                    <div style={(thisElem.settings.selections.active)?{}:{display: 'none'}}>{thisElem.settings.selections.title}</div>
                    :''}
                {(thisElem.settings.connects.active)?<div className={style.communication} style={(thisElem.settings.connects.active)?{}:{display: 'none'}}>{thisElem.settings.connects.title}</div>:''}
                {(thisElem.settings.delElement.active)?<div className={style.del} style={(thisElem.settings.delElement.active)?{}:{display: 'none'}} onClick={()=>delElem(thisElem.id)}>
                    <div className={style.icon}>
                        <i className="fa-solid fa-trash"/>
                    </div>
                    <div className={style.name}>
                        {thisElem.settings.delElement.title}
                    </div>
                </div>:''}
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
                <ElemEditor element={editElem} winEditEnter={winEditEnter} setWinEditEnter={setWinEditEnter} elements={elements} setElements={setElements} editElem={editElem} setEditElem={setEditElem} winEditBlock={winEditBlock} setWinEditBlock={setWinEditBlock}/>
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