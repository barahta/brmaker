import React, {useRef, useEffect, useState, useCallback} from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import style from './PlusPackReaFarm.module.scss';
import NewsService from "../../services/NewsService";
import {useMessage} from "../../hooks/message.hook";
import Cropper from 'react-easy-crop';
import {getCroppedImg} from './cropImageHelper';
import {useLocation} from "react-router-dom";


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

function EditPackReaFarm({pack, setActivemodal}) {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const [imgSrc, setImgSrc] = useState(null); // Источник загруженного изображения
    const [crop, setCrop] = useState({ x: 0, y: 0 }); // Позиция обрезки
    const [zoom, setZoom] = useState(1); // Уровень увеличения
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // Координаты обрезки
    const [isCropping, setIsCropping] = useState(false); // Показывать ли окно обрезки
    const message = useMessage();
    const [dateTime, setDateTime] = useState('');
    const localDateTime = new Date().toLocaleString('sv-SE', { timeZoneName: 'short' });
    const handleDateTimeChange = (event) => {
        setDateTime(event.target.value);
    };


    const [dateTimeActive, setDateTimeActive] = useState('');

    const handleDateTimeChangeActive = (event) => {
        setDateTimeActive(event.target.value);
    };

    const post = []

    const [view, setView] = useState(post);
    const [namepost, setNamepost] = useState('');
    const [descpost, setDescpost] = useState('');
    const [textpost, setTextpost] = useState('');
    const [urlpost, setUrlpost] = useState('');
    const [total, setTotal] = useState('');
    const fileInputRef = useRef(null);
    const [imgpage, setImgpage] = useState('');
    const [imgfull, setImgfull] = useState('');
    const [ed, setEd] = useState('');
    const [num, setNum] = useState('');
    const [listcom, setListcom] = useState([]);
    const [originalFile, setOriginalFile] = useState(null);

    const getComVak = async () => {
        try {
            const {data} = await NewsService.getComVak({com: company})
            setListcom(data)
        }catch(e){
            console.log(e)
        }
    }

    const moveStrock = (fromIndex, toIndex) => {
        const updatedContent = [...view];
        const [movedItem] = updatedContent.splice(fromIndex, 1); // Удалить элемент из старой позиции
        updatedContent.splice(toIndex, 0, movedItem); // Вставить его в новую позицию

        setView(updatedContent); // Сохраняем обновленный массив
    };

    const cancelCropping = () => {
        setImgSrc(null); // Удаляем источник изображения
        setIsCropping(false); // Выключаем режим обрезки
        setCrop({ x: 0, y: 0 }); // Сбрасываем положение обрезки
        setZoom(1); // Сбрасываем увеличение
        setCroppedAreaPixels(null); // Сбрасываем координаты обрезки
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
        if(namepost.length>0 && descpost !== ''){

            try{
                const {data} = await NewsService.updatePack({id: pack.id,capter: company, name: namepost, time: descpost, desc: view, price: total, image: imgpage, publicdesc: `${num}|${ed}`, priory: pack.priory})
                // const {data} = await NewsService.createPack({capter: company, name: namepost, time: descpost, desc: view, price: num, image: imgpage, publicdesc: ed, priory: 0})
                if(data){
                    message(`${namepost} успешно создан`)
                    setView([])
                    setNamepost('')
                    setDescpost('')
                    setTextpost('')
                    setImgpage('')
                    setDateTime('')
                    setDateTimeActive('')
                    setActivemodal(false)
                }
            }catch(e){
                console.log(e)
            }
        }else{
            message(`Не создано! Укажите наименование и стоимость пакета (обязательные параметры)`)
        }
        // try{
        //     if(textpost.length>0 && namepost.length>0 && descpost.length>0){
        //         let newsDateTime
        //         let publishDateTime
        //
        //
        //         if(dateTime.length === 0){
        //             newsDateTime=localDateTime
        //         }else{
        //             newsDateTime=dateTime
        //         }
        //         if(dateTimeActive.length === 0){
        //             publishDateTime=localDateTime
        //         }else{
        //             publishDateTime=dateTime
        //         }
        //         const {data} = await NewsService.createPost({name: namepost, dev: descpost, desc: view, image: imgpage, imagefull: imgfull, newsDateTime, publishDateTime})
        //         if(data){
        //             setView([])
        //             setNamepost('')
        //             setDescpost('')
        //             setTextpost('')
        //             setImgpage('')
        //             setDateTime('')
        //             setDateTimeActive('')
        //             setActivemodal(false)
        //         }else{
        //             message('Новость не создалась, попробуйте еще раз')
        //         }
        //     }else{
        //         message('Есть незаполненные поля')
        //     }
        //
        // }catch(e){
        //     console.log(e)
        // }
    }

    useEffect(()=>{
        getComVak()
    }, [])

    useEffect(()=>{
        setImgpage(pack.image)
        setView(pack.desc)
        setNamepost(pack.name)
        setDescpost(pack.time)
        setTotal(pack.price)
        let oneparam
        let twoparam
        if(pack.publicdesc && pack.publicdesc.split("|")[0]){
            oneparam = pack.publicdesc.split("|")[0]
        }else{
            oneparam = ''
        }
        if(pack.publicdesc && pack.publicdesc.split("|")[1]){
            twoparam = pack.publicdesc.split("|")[1]
        }else{
            twoparam = ''
        }
        setEd(twoparam)
        setNum(oneparam)
    }, [pack])
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
                                    aspect={4 / 4}
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
                    <div className={style.nameblock}>Название</div>
                    <input className={style.title} value={namepost} onChange={(e)=>setNamepost(e.target.value)}/>
                    <div className={style.nameblock}>Категория</div>
                    <select  value={descpost} onChange={(e)=>setDescpost(e.target.value)} className={style.desc}>
                        <option></option>
                        {(listcom)&&listcom.map((cat, index)=>(
                            <option key={index}>{cat.name}</option>
                        ))}
                    </select>
                    <div className={style.paramcoin}>
                        <div className={style.paramcoin_column}>
                            <div className={style.paramcoin_column_label}>Шаг (кол-во)</div>
                            <input type="number" value={num} onChange={(e)=>setNum(e.target.value)} className={style.paramcoin_column_input}/>
                        </div>
                        <div className={style.paramcoin_column}>
                            <div className={style.paramcoin_column_label}>Ед. измерения (гр., шт)</div>
                            <input type="text" value={ed} onChange={(e)=>setEd(e.target.value)} className={style.paramcoin_column_input}/>
                        </div>
                    </div>

                </div>

                <div className={style.center}>
                    <div className={style.nameblock}>Описание</div>
                    <input className={style.desc}  onChange={(e)=>setTextpost(e.target.value)} value={textpost}/>
                    <div className={style.btnplus} onClick={updateText}>Добавить </div>
                    <div className={style.listp}>
                        {(view)&&view.map((strock, index) => (
                            <DraggableStrock
                                key={index}
                                index={index}
                                strock={strock}
                                moveStrock={moveStrock}
                                deleteStrock={deleteStrock}
                            />
                        ))}
                    </div>
                </div>

                <div className={style.right}>
                    <div className={style.up}>
                        <div style={{width: '100%'}}>
                            <div className={style.nameblock} style={{width: '100%'}}>Стоимость за ед.</div>
                            <input className={style.desc} type="number"  style={{width: 'calc(100% - 20px)', padding: '0 10px', marginTop: 10, border: '1px solid #CCC', outline: 'none', height: 32}} onChange={(e)=>setTotal(e.target.value)} value={total}/>
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

export default EditPackReaFarm;