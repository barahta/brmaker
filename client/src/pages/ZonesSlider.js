import style from './styles/ZonesSlider.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import BigModal from "../components/modalwin/BigModal";
import {useMessage} from "../hooks/message.hook";
import NewsService from "../services/NewsService";
import EditPack from "../components/forms/EditPack";
import PlusZones from "../components/forms/PlusZones";
import EditZones from "../components/forms/EditZones";
import React, {useRef} from "react";
import imageCompression from "browser-image-compression";


function ZonesSlider () {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();
    const [data, setData] = useState('')
    const [namezone, setNameZone] = useState('')
    const [desczone, setDescZone] = useState('')
    const [editact, setEditact] = useState(false)
    const [plusPack, setPlusPack] = useState(false)
    const [plusZone, setPlusZone] = useState(false)
    const [editPack, setEditPack] = useState(false)
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
            maxWidthOrHeight: 1920, // Максимальная ширина или высота
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

    const getZonesSlides = async () => {
        try{
            const {data} = await NewsService.getZonesSlides({capter: company})
            console.log(data)
            if(data){
                const sortedData = data.sort((a, b) => parseInt(b.priory, 10) - parseInt(a.priory, 10));
                setList(sortedData)
            }
        }catch(e){
            console.log(e)
        }
    }

    const plusZoneSlider = async () => {
        try{
            const {data} = await NewsService.plusZoneSlider({image: imgpage, name: namezone, desc: desczone, priory: 0, capter: company})
            if(data){
                setNameZone('')
                setDescZone('')
                setImgpage('')
                getZonesSlides()
            }
        }catch(e){
            console.log(e)
        }
    }

    const delZoneSlider = async (id, name) => {
        try{
            const {data} = await NewsService.delZoneSlider({id})
            if (data){
                message('Слайд ' + name + ' удален')
                getZonesSlides()
            }
        }catch(e){
            console.log(e)
        }
    }

    const changePriory = async (idzone, num, index) => {
        const newarr = [...list]
        newarr[index].priory = num
        setList(newarr)
        try {
            const {data} = await NewsService.editPrioryZoneSlider({id: idzone, priory: num})
        }catch (e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getZonesSlides()
    }, [])

    return (
        <div className={style.bodymain}>
            {isLoading && <div className={style.loading}><div className={style.indicate}></div></div>}
            {/*<BigModal data={<PlusZones com={company} setActivemodal={setPlusZone}/>} activemodal={plusZone} setActivemodal={setPlusZone} setData={setData}/>*/}
            {/*<BigModal data={<EditZones thiszone={data} setPack={setData} com={company} setActivemodal={setEditPack}/>} activemodal={editPack} setActivemodal={setEditPack} setData={setData}/>*/}
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
                        <input type="text" placeholder='Наименование слайда' value={namezone} onChange={(e)=>setNameZone(e.target.value)}/>
                        <input type="text" placeholder='Описание слайда' value={desczone} onChange={(e)=>setDescZone(e.target.value)}/>
                        <div className={style.btnplus} onClick={plusZoneSlider}>Добавить</div>
                        <div className={style.listzones}>
                            {(list && list.length > 0)&&list.map((slide, indexSlide)=>(
                                <div className={style.thiszone} style={{backgroundImage: `url('${slide.image}')`}}>
                                    <div className={style.texts}>
                                        <div className={style.texts_name}>{slide.name}</div>
                                        <div className={style.texts_desc}>{slide.desc}</div>
                                    </div>
                                    <div className={style.tumbler}>
                                        <input type="number" value={+slide.priory} onChange={(e)=>changePriory(slide.id, e.target.value, indexSlide)}></input>
                                        <div className={style.line_del}><i className="fa-solid fa-trash-can" onClick={()=>delZoneSlider(slide.id, slide.name)}/></div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default ZonesSlider