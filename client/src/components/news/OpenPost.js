import React, {useRef,useEffect, useState} from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import style from './CreatePostStyle.module.scss';
import NewsService from "../../services/NewsService";
import {useMessage} from "../../hooks/message.hook";
import {useCallback} from "react";
import {getCroppedImg} from "./cropImageHelper";
import Cropper from "react-easy-crop";

const ITEM_TYPE = 'STROCK';

function DraggableStrock({ strock, index, moveStrock, deleteStrock }) {
    const [, ref] = useDrag({
        type: ITEM_TYPE,
        item: { index }
    });

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item) {
            if (item.index !== index) {
                moveStrock(item.index, index);
                item.index = index; // Update index after swapping
            }
        }
    });

    return (
        <div ref={(node) => ref(drop(node))} className={style.strock}>
            <p>
                {strock}
                <div className={style.grab}>
                    <i className="fa-regular fa-hand-back-fist" />
                </div>
            </p>
            <div className={style.delete}>
                <i className="fa-solid fa-trash" onClick={()=>deleteStrock(index)}></i>
            </div>
        </div>
    );
}

function OpenPost({thisPost,setActivemodal}) {
    const coms = [
        {
            name: 'OMEDIA!',
            active: false
        },
        {
            name: 'HOPE KIDS',
            active: false
        },
        {
            name: 'REA FARM',
            active: false
        },
        {
            name: 'HOPE FITNESS',
            active: false
        },
        {
            name: 'ВЕРНЫЙ ДРУГ',
            active: false
        },
        {
            name: 'АВИАТЕХ',
            active: false
        }
    ]
    const message = useMessage();
    const [imgSrc, setImgSrc] = useState(null); // Источник загруженного изображения
    const [crop, setCrop] = useState({ x: 0, y: 0 }); // Позиция обрезки
    const [zoom, setZoom] = useState(1); // Уровень увеличения
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // Координаты обрезки
    const [isCropping, setIsCropping] = useState(false); // Показывать ли окно обрезки
    const [publiccom, setPubliccom] = useState(coms)

    const [viewcom, setViewcom] = useState([])

    const onoffActive = (index) => {
        const newarr = [...viewcom]
        newarr[index].active = !newarr[index].active
        setViewcom(newarr)
    }

    const post = []

    const [view, setView] = useState(post);
    const [namepost, setNamepost] = useState('');
    const [descpost, setDescpost] = useState('');
    const [textpost, setTextpost] = useState('');
    const [urlpost, setUrlpost] = useState('');
    const fileInputRef = useRef(null);
    const [imgpage, setImgpage] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [imgfull, setImgfull] = useState('');

    const handleDateTimeChange = (event) => {
        setDateTime(event.target.value);
    };


    const [dateTimeActive, setDateTimeActive] = useState('');

    const handleDateTimeChangeActive = (event) => {
        setDateTimeActive(event.target.value);
    };
    const [originalFile, setOriginalFile] = useState(null);

    const cancelCropping = () => {
        setImgSrc(null); // Удаляем источник изображения
        setIsCropping(false); // Выключаем режим обрезки
        setCrop({ x: 0, y: 0 }); // Сбрасываем положение обрезки
        setZoom(1); // Сбрасываем увеличение
        setCroppedAreaPixels(null); // Сбрасываем координаты обрезки
    };
    const moveStrock = (fromIndex, toIndex) => {
        const updatedContent = [...view];
        const [movedItem] = updatedContent.splice(fromIndex, 1); // Удалить элемент из старой позиции
        updatedContent.splice(toIndex, 0, movedItem); // Вставить его в новую позицию

        setView(updatedContent); // Сохраняем обновленный массив
    };

    const updateText = () => {
        const newview = [...view]
        if(textpost.length > 0){
            newview.push(textpost)
            setView(newview)
            setTextpost('')
        }
    }

    const deleteStrock = (index) => {
        const newView = [...view];  // Создаём копию массива
        newView.splice(index, 1);   // Удаляем элемент по индексу
        setView(newView);
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Очистка предыдущих данных
            setImgSrc(null);
            setImgpage('');
            setOriginalFile(null);
            setCroppedAreaPixels(null);

            // Сохраняем оригинальный файл
            setOriginalFile(file);

            // Читаем файл для отображения предпросмотра и кроппинга
            const reader = new FileReader();
            reader.onload = () => {
                setImgSrc(reader.result); // Устанавливаем источник изображения для кроппинга
                setCrop({ x: 0, y: 0 }); // Сбрасываем положение обрезки
                setZoom(1); // Сбрасываем увеличение
                setIsCropping(true); // Включаем режим обрезки
            };
            reader.readAsDataURL(file);
        }
    };
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const [previousImages, setPreviousImages] = useState([]); // Хранение путей загруженных изображений

    const deletePreviousImages = async () => {
        try {
            // Проверяем, есть ли изображения для удаления
            if (previousImages.length === 0) return;

            // Удаляем все ранее загруженные изображения
            for (const imagePath of previousImages) {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/deleteCrop`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ path: imagePath }),
                });

                if (!response.ok) {
                    console.error(`Ошибка при удалении файла: ${imagePath}`);
                }
            }

            setPreviousImages([]); // Очищаем массив после удаления
        } catch (error) {
            console.error('Ошибка при удалении изображений:', error);
            message('Ошибка при удалении старых изображений');
        }
    };


    const uploadCroppedImage = async () => {
        try {
            if (!croppedAreaPixels || !originalFile) {
                throw new Error('Не все данные для загрузки доступны');
            }

            // Удаляем старые изображения перед загрузкой новых
            await deletePreviousImages();

            // Загружаем обрезанное изображение
            const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
            const croppedFormData = new FormData();
            croppedFormData.append('image', croppedImage);

            const croppedResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/upload`, {
                method: 'POST',
                body: croppedFormData,
            });

            if (!croppedResponse.ok) {
                throw new Error('Ошибка при загрузке обрезанного изображения');
            }

            const croppedData = await croppedResponse.json();
            console.log('Cropped image uploaded:', croppedData);

            // Загружаем оригинальный файл
            const originalFormData = new FormData();
            originalFormData.append('image', originalFile);

            const originalResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/upload`, {
                method: 'POST',
                body: originalFormData,
            });

            if (!originalResponse.ok) {
                throw new Error('Ошибка при загрузке оригинального изображения');
            }

            const originalData = await originalResponse.json();
            console.log('Original image uploaded:', originalData);

            // Обновляем состояние
            setImgpage(croppedData.filePath); // Устанавливаем путь обрезанного изображения
            setImgfull(originalData.filePath)
            setOriginalFile(null); // Очищаем оригинальный файл
            setImgSrc(null); // Очищаем источник
            setIsCropping(false); // Выключаем кроппер

            // Сохраняем пути новых изображений для возможного удаления в будущем
            setPreviousImages([croppedData.filePath, originalData.filePath]);

            message('Оба изображения успешно загружены');
        } catch (error) {
            console.error('Ошибка при загрузке изображений:', error);
            message(`Ошибка: ${error.message}`);
        }
    };



    const handleClick = () => {
        if (!isCropping && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const createPost = async () => {
        try{
            if(namepost.length>0 && descpost.length>0){
                const {data} = await NewsService.updatePost({id: thisPost.id,text: [textpost], name: namepost, desc: descpost, image: imgpage, public: viewcom, imagefull: imgfull, newsDateTime: dateTime, publishDateTime: dateTimeActive})
                if(data){
                    setView([])
                    setNamepost('')
                    setDescpost('')
                    setTextpost('')
                    setImgpage('')
                    setDateTime('')
                    setDateTimeActive('')
                    setImgfull('')
                    setActivemodal(false)
                }else{
                    message('Новость не создалась, попробуйте еще раз')
                }
            }else{
                message('Есть незаполненные поля')
            }

        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        console.log(thisPost)
        setViewcom(thisPost.public)
        setNamepost(thisPost.title)
        setDescpost(thisPost.desc)
        setTextpost(thisPost.text)
        setImgpage(thisPost.image)
        setPubliccom(thisPost.public)
        if (thisPost.newsDateTime) {
            const newsDate = new Date(thisPost.newsDateTime);
            newsDate.setHours(newsDate.getHours() + 5); // Добавляем 5 часов
            setDateTime(newsDate.toISOString().slice(0, 16)); // Обрезаем до YYYY-MM-DDTHH:mm
        }

        if (thisPost.publishDateTime) {
            const publishDate = new Date(thisPost.publishDateTime);
            publishDate.setHours(publishDate.getHours() + 5); // Добавляем 5 часов
            setDateTimeActive(publishDate.toISOString().slice(0, 16)); // Аналогично
        }
    }, [thisPost])
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={style.main}>
                <div className={style.left}>
                    <div
                        className={style.photo}
                        style={(imgpage && imgpage.length > 0)
                            ? { backgroundImage: `url('${imgpage}')` }
                            : { backgroundImage: `url('/files/news/nophoto.svg')` }}
                        onClick={handleClick}
                    >
                        <div className={style.active}><i className="fa-solid fa-plus"/></div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                            accept="image/*"
                        />
                        {isCropping && (
                            <div key={imgSrc} className={style.cropContainer}>
                                <Cropper
                                    image={imgSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={4 / 3}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                                <div className={style.controls}>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        step={0.01}
                                        value={zoom}
                                        onChange={(e) => setZoom(e.target.value)}
                                        className={style.stepbtn}
                                    />
                                    <button onClick={uploadCroppedImage} className={style.savebtn}>
                                        Сохранить
                                    </button>
                                    <button onClick={cancelCropping} className={style.cancelbtn}>
                                        Отмена
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={style.nameblock}>Заголовок новости</div>
                    <input className={style.title} value={namepost} onChange={(e)=>setNamepost(e.target.value)}/>
                    <div className={style.nameblock}>Краткое описание новости</div>
                    <textarea className={style.desc} value={descpost} onChange={(e)=>setDescpost(e.target.value)}></textarea>
                    <div className={style.dateblock}>
                        <label htmlFor="datetime">Дата и время новости:</label>
                        <input
                            type="datetime-local"
                            id="datetime"
                            value={dateTime}
                            onChange={handleDateTimeChange}
                            style={{
                                padding: '10px',
                                margin: '10px 0',
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div className={style.dateblock}>
                        <label htmlFor="datetime">Дата и время публикации:</label>
                        <input
                            type="datetime-local"
                            id="datetime"
                            value={dateTimeActive}
                            onChange={handleDateTimeChangeActive}
                            style={{
                                padding: '10px',
                                margin: '10px 0',
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                </div>

                <div className={style.center}>
                    <div className={style.nameblock}>Содержание новости</div>
                    <textarea className={style.desc}  onChange={(e)=>setTextpost(e.target.value)} value={textpost}></textarea>
                    {/*<div className={style.btnplus} onClick={updateText}>Добавить </div>*/}
                    {/*<div className={style.listp}>*/}
                    {/*    {(view)&&view.map((strock, index) => (*/}
                    {/*        <DraggableStrock*/}
                    {/*            key={index}*/}
                    {/*            index={index}*/}
                    {/*            strock={strock}*/}
                    {/*            moveStrock={moveStrock}*/}
                    {/*            deleteStrock={deleteStrock}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </div>

                <div className={style.right}>
                    <div className={style.up}>
                        <div className={style.title}>Где опубликовано:</div>
                        <div className={style.listcom}>
                            {(publiccom)&&publiccom.map((com, indexcom)=>(
                                <div className={style.com} key={indexcom}>
                                    <div className={style.name} style={(com.active)? {color: '#410099'}:{}}>{com.name}</div>
                                    <div className={(com.active)?style.btnon:style.btnoff} onClick={()=>onoffActive(indexcom)}>
                                        <div className={style.sphere}></div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className={style.bottom}>
                        <div className={style.saving} onClick={createPost}>
                            <i className="fa-regular fa-floppy-disk"/>
                            <div className={style.text}>Сохранить</div>
                        </div>
                    </div>

                </div>
            </div>
        </DndProvider>
    );
}

export default OpenPost;