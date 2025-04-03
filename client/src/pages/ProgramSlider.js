import style from './styles/ProgramsSlider.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import {useMessage} from "../hooks/message.hook";
import NewsService from "../services/NewsService";
import React, {useRef} from "react";
import imageCompression from "browser-image-compression";


function ProgramSlider () {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();
    const [data, setData] = useState('')
    const [namezone, setNameZone] = useState('')
    const [desczone, setDescZone] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState([])
    const fileInputRef = useRef(null);
    const [imgpage, setImgpage] = useState('');

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        setIsLoading(true);
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
                    setIsLoading(false);
                })
                .catch((error) => console.error('Error uploading image:', error));
        } catch (error) {
            console.error('Error compressing image:', error);
            setIsLoading(false);
        }
    };
    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const getProgramsSlides = async () => {
        try{
            const {data} = await NewsService.getProgramsSlides({capter: company})
            console.log(data)
            if(data){
                console.log(data)
                setList(data)
            }
        }catch(e){
            console.log(e)
        }
    }

    const plusProgramSlider = async () => {
        try{
            const {data} = await NewsService.plusProgramSlider({image: imgpage, name: namezone, desc: desczone, capter: company})
            if(data){
                setNameZone('')
                setDescZone('')
                setImgpage('')
                getProgramsSlides()
            }
        }catch(e){
            console.log(e)
        }
    }

    const delProgramSlider = async (id, name) => {
        try{
            const {data} = await NewsService.delProgramSlider({id})
            if (data){
                message('Слайд ' + name + ' удален')
                getProgramsSlides()
            }
        }catch(e){
            console.log(e)
        }
    }



    useEffect(()=>{
        getProgramsSlides()
    }, [])

    return (
        <div className={style.bodymain}>
            {isLoading && <div className={style.loading}><div className={style.indicate}></div></div>}
           <HeaderMain page={`./${company}`}/>
            <div className={style.main}>
                <div className={style.leftpath}>
                    <Navigation />
                </div>
                <div className={style.centerpath}>
                    <div className={style.nav}>
                        <Link to={`/company?com=${company}`} className={style.back}>
                            <i className="fa-solid fa-rotate-left"/>
                            <div className={style.namebtn}>Назад</div>
                        </Link>
                    </div>

                    <div className={style.plusblockz}>
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
                        <div className={style.formplus}>
                            <input type="text" placeholder='Наименование слайда' value={namezone} onChange={(e)=>setNameZone(e.target.value)}/>
                            <textarea type="text" placeholder='Описание слайда' value={desczone} onChange={(e)=>setDescZone(e.target.value)}/>
                            <div className={style.btnplus} onClick={plusProgramSlider}>Добавить</div>
                        </div>

                    </div>
                    <div className={style.slides}>
                        {(list && list.length > 0)&&list.map((slide, index)=>(
                            <div key={index} className={style.slide} style={{backgroundImage: `url('${slide.image}')`}}>
                                <div className={style.name}>{slide.name}</div>
                                <div className={style.description}>{slide.room}</div>
                                <i className="fa-solid fa-trash-can" onClick={()=>delProgramSlider(slide.id, slide.name)}/>
                            </div>
                        ))}

                    </div>
                </div>
            </div>


        </div>
    )
}

export default ProgramSlider