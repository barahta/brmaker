import style from './PlusAUPStyle.module.scss'
import React, {useRef, useState} from "react";
import NewsService from "../../services/NewsService";
import {useMessage} from "../../hooks/message.hook";
import imageCompression from 'browser-image-compression';

function PlusAUP ({man, setActivemodal}) {
    const message = useMessage();
    const fileInputRef = useRef(null);
    const [imgpage, setImgpage] = useState('');

    const [firstname, setFirstname] = useState('')
    const [secondname, setSecondname] = useState('')
    const [lastname, setLastName] = useState('')
    const [developer, setDeveloper] = useState('')
    const [email, setEmail] = useState('')

    const createMan = async()=>{
        try{
            const {data} = await NewsService.plusAUP({firstname,secondname,lastname,developer,email,image:imgpage})
            if(data){
                setImgpage('')
                setFirstname('')
                setSecondname('')
                setLastName('')
                setDeveloper('')
                setEmail('')
                setActivemodal(false)
                message(`${data.developers} ${data.firstname} ${data.lastname} был успешно добавлен`)
            }

        }catch(e){
            console.log(e)
            message(`Что-то пошло не так, попробуйте еще раз`)
        }
    }

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

    return(
        <div className={style.main}>
            <div className={style.title}>Добавление нового сотрудника</div>
            <div className={style.form}>
                <div className={style.photo}

                     onClick={handleClick}
                     style={{backgroundImage: `url('${imgpage}')`}}>
                    <div className={style.active}><i className="fa-solid fa-plus"/></div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        accept="image/*"
                    />
                </div>
                <div className={style.data}>
                    <input type="text" value={firstname} onChange={(e)=>setFirstname(e.target.value)} className={style.inputs} placeholder='Имя'/>
                    <input type="text" value={secondname} onChange={(e)=>setSecondname(e.target.value)} className={style.inputs} placeholder='Отчество'/>
                    <input type="text" value={lastname} onChange={(e)=>setLastName(e.target.value)} className={style.inputs} placeholder='Фамилия'/>
                    <input type="text" value={developer} onChange={(e)=>setDeveloper(e.target.value)} className={style.inputs} placeholder='Должность'/>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className={style.inputs} placeholder='Эл. почта'/>
                    <div className={style.btn} onClick={createMan}>Добавить</div>
                </div>
            </div>
        </div>
    )
}

export default PlusAUP