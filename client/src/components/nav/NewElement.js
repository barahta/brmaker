import style from './NewElement.module.scss'
import BTNs from "../buttons/BTNs";
import Frames from "../layers/Frames";

function NewElement({ isOpen, setIsOpen }){
    const single = {
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
    }
    const write_close = {
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
    }
    const varius = {
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
    }
    const print = {
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
    }
    const save = {
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
    }
    const search = {
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
    }
    const mail = {
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
    }
    const windows = {
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
    }
    const selections = {
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
    }
    const table = {
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
    }
    const list = {
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
    }


    const handleDragStart = (e, type, name, text, table, editor, settings) => {
        e.dataTransfer.setData('elementType', type);
        e.dataTransfer.setData('elementName', name);
        e.dataTransfer.setData('elementText', text);
        e.dataTransfer.setData('elementTable', JSON.stringify(table));
        e.dataTransfer.setData('elementEditor', editor);
        e.dataTransfer.setData('elementSet', JSON.stringify(settings));
    };

    const winsTable = [['Основное', 1], ['Дополнительно 1', 0], ['Дополнительно 2', 0]]


    return(
        <div className={`${style.main} ${isOpen ? style.open : ''}`}>
            <div className={style.exit} onClick={()=>{setIsOpen(false)}}><i className="fa-solid fa-xmark"/></div>
            <div className={style.name}>Elements</div>
            <div className={style.elems}>
                <div className={style.elems_proto}
                     draggable
                     onDragStart={(e) => handleDragStart(e, 'button', 'single', 'single', [], 1, single)}
                >
                    <BTNs btnName={'single'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'button', 'write_close', 'single', [], 2, write_close  )}
                >
                    <BTNs btnName={'write_close'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'button', 'varius', 'single', [], 3, varius  )}
                >
                    <BTNs btnName={'varius'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'button', 'print', 'single', [], 4, print  )}
                >
                    <BTNs btnName={'print'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'button', 'save', 'single', [], 5, save  )}
                >
                    <BTNs btnName={'save'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'button', 'search', 'single', [], 6, search  )}
                >
                    <BTNs btnName={'search'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'button', 'mail', 'single', [], 7, mail  )}
                >
                    <BTNs btnName={'mail'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'frame', 'windows', 'single', [['Основное', 1], ['Дополнительно 1', 0], ['Дополнительно 3', 0]], 8, windows  )}
                >
                    <Frames frameName={'windows'} tables={[['Основное', 1], ['Доп. 1', 0], ['Доп. 3', 0]]}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'frame', 'selections', 'single', [], 9, selections  )}
                >
                    <Frames frameName={'selections'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'frame', 'table', 'single', [], 10, table)}
                >
                    <Frames frameName={'table'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'frame', 'list', 'single', [], 11, list )}
                >
                    <Frames frameName={'list'}/>
                </div>
            </div>


        </div>
    )
}

export default NewElement