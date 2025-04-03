import style from './styles/Gallery.module.scss';
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import BigModal from "../components/modalwin/BigModal";
import EditActivities from "../components/forms/EditActivities";
import PlusPack from "../components/forms/PlusPack";
import { useMessage } from "../hooks/message.hook";
import NewsService from "../services/NewsService";
import EditPack from "../components/forms/EditPack";
import React, { useRef } from "react";
import imageCompression from "browser-image-compression";

function Gallery() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();

    const fileInputRef = useRef(null);
    const [imgPages, setImgPages] = useState([]); // Хранение всех URL изображений
    const [allImgs, setAllImgs] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Индикатор загрузки
    const containerRef = useRef(null);
    const [gridItems, setGridItems] = useState([]);
    const [activemodal, setActivemodal] = useState(false);
    const [data, setData] = useState('');
    const [more, setMore] = useState(8)
    const postResume = (pos) => {
        setData(pos)
        setActivemodal(true)
    }
    useEffect(() => {
        const container = containerRef.current;
        const updateGridItems = () => {
            if (container) {
                const items = Array.from(container.querySelectorAll('.item'));
                setGridItems(items);
            }
        };

        window.addEventListener('resize', updateGridItems);
        updateGridItems();

        return () => window.removeEventListener('resize', updateGridItems);
    }, [allImgs]);
    const createBaseImage = async (images) => {
        try{
            const {data} = await NewsService.createImgGallery({capter: company, image: images.filePath})

            console.log(images)
        }catch(e){
            console.log(e)
        }
    }



    const getGalleryImgs = async () => {
        try{
            const {data} = await NewsService.getGalleryImgs({capter: company})
            if(data){
                data.reverse()
                setAllImgs(data)
            }
        }catch(e){
            console.log(e)
        }
    }

    const deleteImage = async (idimg, nameimg) =>{
        try{
            const {data} = await NewsService.deleteImgGalary({id: idimg, name: nameimg})
            message('Изображение удалено')
            if(data){
                getGalleryImgs()
            }
        }catch(e){
            console.log(e)
            message('Попробуйте еще раз')
        }
    }
    // getGalleryImgs
    const handleFileUpload = async (event) => {
        const files = Array.from(event.target.files);

        setIsLoading(true); // Включаем индикатор загрузки

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
        };

        const uploadedImages = [];

        for (const file of files) {
            try {
                const compressedFile = await imageCompression(file, options);

                const formData = new FormData();
                formData.append('image', compressedFile);

                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/gallery/`, {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if(data){
                    createBaseImage(data)
                }
                uploadedImages.push(data.filePath);

            } catch (error) {
                console.error('Error compressing or uploading image:', error);
            }
        }

        setImgPages((prev) => [...prev, ...uploadedImages]); // Добавляем новые изображения в состояние
        setIsLoading(false); // Выключаем индикатор загрузки
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        getGalleryImgs()
    }, [imgPages]);

    return (
        <div className={style.bodymain}>
            <HeaderMain page={`./${company}`} />
            <div className={style.main}>
                <div className={style.leftpath}>
                    <Navigation />
                </div>
                <div className={style.centerpath}>
                    <div className={style.nav}>
                        <Link to={`/company?com=${company}`} className={style.back}>
                            <i className="fa-solid fa-rotate-left" />
                            <div className={style.namebtn}>Назад</div>
                        </Link>
                        <div className={style.pluspost} onClick={handleClick}>
                            <i className="fa-solid fa-plus" />
                            <div className={style.namebtn}>Добавить ФОТО</div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                                accept="image/*"
                                multiple // Позволяет выбрать несколько файлов
                            />
                        </div>
                    </div>
                    <div className={style.gallery}>
                        {isLoading && <div className={style.loading}><div className={style.indicate}></div></div>} {/* Индикатор загрузки */}



                        {/*<div className={style.photo} onClick={handleClick}>*/}
                        {/*    <div className={style.active}><i className="fa-solid fa-plus" /></div>*/}

                        {/*</div>*/}
                        {/*{(allImgs)&&allImgs.map((img, index) => (*/}
                        {/*    <div key={index} className={style.imagecov} style={(img)?{backgroundImage: `url('${img.image}')`, width: 300, height: 150, }:{}}></div>*/}
                        {/*))}*/}

                    </div>
                    <div className={style.maingallery}>
                        {/*<WriteModal activemodal={activemodal} setActivemodal={setActivemodal} data={<OpenImg img={data} />} setData={setData}/>*/}
                        <div className={style.grid} ref={containerRef}>
                            {allImgs.map((image, index) =>{ if(index<more){return(
                                <div key={index} className={style.item} onClick={()=>deleteImage(image.id, image.image)}>
                                    <div className={style.backitem}><i className="fa-solid fa-trash-can"></i></div>
                                    <img src={`${image.image}`} alt={`Gallery ${index}`} />
                                    <div className={style.black}><div className={style.delimg}>х</div></div>
                                </div>
                            )}})}
                        </div>
                        <div className={style.more} onClick={()=>setMore(more+8)} style={(allImgs.length <= more)?{display: 'none'}:{}}>ЕЩЁ</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;