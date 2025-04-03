import style from './styles/TrenersSlider.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import {useMessage} from "../hooks/message.hook";
import NewsService from "../services/NewsService";
import React, {useRef} from "react";
import imageCompression from "browser-image-compression";
import BigModal from "../components/modalwin/BigModal";
import PlusZones from "../components/forms/PlusZones";
import TrenersGroup from "../components/forms/TrenersGroup";


function TrenersSlider () {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();
    const [data, setData] = useState('')
    const [namezone, setNameZone] = useState('')
    const [desczone, setDescZone] = useState('')
    const [stazh, setStazh] = useState('')
    const [room, setRoom] = useState('')
    const [group, setGroup] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [plusZone, setPlusZone] = useState(false);
    const [list, setList] = useState([])
    const [groupsList, setGroupsList] = useState([])
    const [listgroup, setListGroup] = useState([])
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

    const getTrenersMan = async () => {
        try{
            const {data} = await NewsService.getTrenersMan({capter: company})
            console.log(data)
            if(data){
                console.log(data)
                const uniqueRooms = [...new Set(data.map(item => item.group))];
                setGroupsList(uniqueRooms)
                setList(data)
            }
        }catch(e){
            console.log(e)
        }
    }

    const plusTrenerMan = async () => {
        try{
            const {data} = await NewsService.plusTrenerMan({image: imgpage, room: room, name: namezone, group: group, desc: desczone, stazh: stazh, capter: company})
            if(data){
                setNameZone('')
                setDescZone('')
                setImgpage('')
                setStazh('')
                setGroup('')
                setRoom('')
                getTrenersMan()
            }
        }catch(e){
            console.log(e)
        }
    }

    const delTrenerMan = async (id, name) => {
        try{
            const {data} = await NewsService.delTrenerMan({id})
            if (data){
                message('Тренер ' + name + ' удален')
                getTrenersMan()
            }
        }catch(e){
            console.log(e)
        }
    }

    const getTrenersGroup = async () => {
        try{
            const {data} = await NewsService.getTrenersGroup({capter: company})
            setListGroup(data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getTrenersMan()
        getTrenersGroup()
    }, [])

    return (
        <div className={style.bodymain}>
            {isLoading && <div className={style.loading}><div className={style.indicate}></div></div>}
            <BigModal data={<TrenersGroup com={company} setActivemodal={setPlusZone}/>} activemodal={plusZone} setActivemodal={setPlusZone} setData={setData}/>
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
                        <div className={style.back} onClick={()=>setPlusZone(true)}>
                            <div className={style.namebtn}>Группы тренеров</div>
                        </div>
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
                            <select value={group}  onChange={(e)=>setGroup(e.target.value)}>
                                <option value={""} disabled selected hidden>Выберите группу</option>
                                {(listgroup)&&listgroup.map((group, index)=>(
                                    <option key={index} >{group.name}</option>
                                ))}
                            </select>
                            <input type="text" placeholder='Имя тренера' value={namezone} onChange={(e)=>setNameZone(e.target.value)}/>
                            <input type="text" placeholder='Категория' value={room} onChange={(e)=>setRoom(e.target.value)}/>
                            <textarea value={desczone} onChange={(e)=>setDescZone(e.target.value)}/>
                            <input type="text" placeholder='Стаж (7 лет)' value={stazh} onChange={(e)=>setStazh(e.target.value)}/>
                            <div className={style.btnplus} onClick={plusTrenerMan}>Добавить</div>
                        </div>

                    </div>
                    <div className={style.slides}>
                        {(groupsList && groupsList.length > 0)&&groupsList.map((group, indexGroup)=>(
                            <div key={indexGroup}>
                                <div style={{fontSize: '20pt', borderBottom: '1px solid #CCC', width: '100%', marginBottom: '10px'}}>{group}</div>
                                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                {(list && list.length > 0)&&list.map((slide, index)=>{
                                    if(slide.group === group){return(
                                        <div key={index} className={style.slide} style={{backgroundImage: `url('${slide.image}')`}}>
                                            <div className={style.name}>{slide.name}</div>
                                            <div className={style.description}>{slide.room}</div>
                                            <div className={style.description}>{slide.desc}</div>
                                            <i className="fa-solid fa-trash-can" onClick={()=>delTrenerMan(slide.id, slide.name)}/>
                                        </div>
                                    )}
                                }

                                )}
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>


        </div>
    )
}

export default TrenersSlider