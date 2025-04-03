import style from './PlusPack.module.scss'
import {useEffect, useState} from "react";
import {useMessage} from "../../hooks/message.hook";
import NewsService from "../../services/NewsService";
import imageCompression from "browser-image-compression";
import React, {useRef} from "react";

function EditPack({pack, setPack, com, setActivemodal}){
    const message = useMessage();
    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [price, setPrice] = useState('')
    const [publicdesc, setPublicdesc] = useState('')
    const [priory, setPriory] = useState(0)
    const [descline, setDescLine] = useState('')
    const [desclist, setDescList] = useState([])
    const fileInputRef = useRef(null);
    const [imgpage, setImgpage] = useState('');

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];

        // Настройки для сжатия
        const options = {
            maxSizeMB: 1, // Максимальный размер файла в мегабайтах
            maxWidthOrHeight: 800, // Максимальная ширина или высота
            useWebWorker: true, // Использовать веб-воркеры для сжатия (ускорение процесса)
        };

        try {
            // Сжатие изображения
            const compressedFile = await imageCompression(file, options);

            // Отправка сжатого файла на сервер
            const formData = new FormData();
            formData.append('image', compressedFile);

            fetch(`${process.env.REACT_APP_API_BASE_URL}/api/upload`, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if(data && imgpage.length>0){
                        try {
                            // Удаляем старое изображение
                            const deleteResponse = fetch(`${process.env.REACT_APP_API_BASE_URL}/api/delete`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ filePath: imgpage }), // Передаем текущую ссылку на изображение
                            });

                            const deleteResult = deleteResponse.json();
                            console.log('Удаление завершено:', deleteResult);
                        } catch (deleteError) {
                            console.error('Ошибка при удалении изображения:', deleteError);
                        }
                    }
                    setImgpage(data.filePath);
                })
                .catch((error) => console.error('Error uploading image:', error));
        } catch (error) {
            console.error('Error compressing image:', error);
        }
    };
    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const delDescLine = (index)=>{
        const newarr = [...desclist]
        newarr.splice(index, 1)
        setDescList(newarr)
    }

    const plusDescLine = () => {
        if(descline.length > 2){
            const newarr = [...desclist]
            newarr.push(descline)
            setDescList(newarr)
            setDescLine('')
        }else{
            message('Введите значение описания для добавления')
        }
    }

    const updatePack = async () => {
        if(name.length > 2 && price.length> 2){
            try{
                const {data} = await NewsService.updatePack({id: pack.id,capter: com, name, time, publicdesc, desc: desclist, price, priory, image: imgpage})
                if(data){
                    message(`${name} успешно изменено`)
                    setPack('')
                    setActivemodal(false)
                }
            }catch(e){
                console.log(e)
            }
        }else{
            message(`Не сохранено! Укажите наименование и стоимость пакета (обязательные параметры)`)
        }

    }


    useEffect(()=>{
        setName(pack.name)
        setTime(pack.time)
        setPrice(pack.price)
        setPriory(pack.priory)
        setDescList(pack.desc)
        setImgpage(pack.image)
        setPublicdesc(pack.publicdesc)
    },[pack])

    return(
        <div className={style.main}>
            <div className={style.left_path}>
                <div className={style.title}>Добавление нового пакета</div>
                <div className={style.name}>Наименование</div>
                <input type="text" placeholder='' value={name} onChange={(e)=>setName(e.target.value)}/>
                <div className={style.photo}

                     onClick={handleClick}
                     style={(com==='hopefitness' || com==='hopekids')?{display: 'none'}:{backgroundImage: `url('${imgpage}')`}}>
                    <div className={style.active}><i className="fa-solid fa-plus"/></div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        accept="image/*"
                    />
                </div>
                <div className={style.time}>Краткое описание</div>
                <input type="text" placeholder='' value={time} onChange={(e)=>setTime(e.target.value)}/>
                <div className={style.price} style={(com==='hopefitness')?{}:{display:'none'}}>Подробное описание</div>
                <textarea value={publicdesc} onChange={(e)=>setPublicdesc(e.target.value)}  style={(com==='hopefitness')?{}:{display:'none'}}/>
                <div className={style.price}>Стоимость</div>
                <input type="number" placeholder='' value={price} onChange={(e)=>setPrice(e.target.value)}/>
                <div className={style.priory}>
                    Приоритет:
                    <input type="number" value={priory} onChange={(e)=>setPriory(e.target.value)}></input>
                </div>
            </div>
            <div className={style.right_path}>
                <div className={style.title}>Описание пакета (наполнение)</div>
                <div className={style.desc}>
                    <div className={style.desc_plus}>
                        <input type="text" placeholder='' value={descline} onChange={(e)=>setDescLine(e.target.value)}/>
                        <div className={style.plusdesc_btn} onClick={plusDescLine}>Добавить</div>
                    </div>
                    <div className={style.list}>
                        {(desclist)&&desclist.map((desc, indexDesc)=>(
                            <div key={indexDesc} className={style.line}><i className="fa-solid fa-trash-can" onClick={()=>delDescLine(indexDesc)}/>{desc}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={style.line_btn} onClick={updatePack}>Сохранить</div>
        </div>
    )
}

export default EditPack