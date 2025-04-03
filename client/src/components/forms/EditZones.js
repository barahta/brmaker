import style from './PlusZones.module.scss'
import {useEffect, useState} from "react";
import {useMessage} from "../../hooks/message.hook";
import NewsService from "../../services/NewsService";
import React, {useRef} from "react";
import imageCompression from "browser-image-compression";
import {useLocation} from "react-router-dom";

function EditZones({thiszone, com, setActivemodal}){
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();
    const [point, setPoint] = useState(0)
    const [descpost, setDescpost] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('')
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [img5, setImg5] = useState('')
    const [img6, setImg6] = useState('')
    const [price, setPrice] = useState('')
    const [priory, setPriory] = useState(0)
    const [descline, setDescLine] = useState('')
    const [desclist, setDescList] = useState([])
    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);
    const fileInputRef3 = useRef(null);
    const fileInputRef4 = useRef(null);
    const fileInputRef5 = useRef(null);
    const fileInputRef6 = useRef(null);
    const [imgpage1, setImgpage1] = useState('');
    const [imgpage2, setImgpage2] = useState('');
    const [imgpage3, setImgpage3] = useState('');
    const [imgpage4, setImgpage4] = useState('');
    const [imgpage5, setImgpage5] = useState('');
    const [imgpage6, setImgpage6] = useState('');

    const handleFileUpload1 = async (event) => {
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
                    if(data && imgpage1.length>0){
                        try {
                            // Удаляем старое изображение
                            const deleteResponse = fetch(`${process.env.REACT_APP_API_BASE_URL}/api/delete`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ filePath: imgpage1 }), // Передаем текущую ссылку на изображение
                            });

                            const deleteResult = deleteResponse.json();
                            console.log('Удаление завершено:', deleteResult);
                        } catch (deleteError) {
                            console.error('Ошибка при удалении изображения:', deleteError);
                        }
                    }

                    setImgpage1(data.filePath);
                })
                .catch((error) => console.error('Error uploading image:', error));
        } catch (error) {
            console.error('Error compressing image:', error);
        }
        setIsLoading(false);
    };
    const handleFileUpload2 = async (event) => {
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
                    if(data && imgpage2.length>0){
                        try {
                            // Удаляем старое изображение
                            const deleteResponse = fetch(`${process.env.REACT_APP_API_BASE_URL}/api/delete`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ filePath: imgpage2 }), // Передаем текущую ссылку на изображение
                            });

                            const deleteResult = deleteResponse.json();
                            console.log('Удаление завершено:', deleteResult);
                        } catch (deleteError) {
                            console.error('Ошибка при удалении изображения:', deleteError);
                        }
                    }
                    setImgpage2(data.filePath);
                })
                .catch((error) => console.error('Error uploading image:', error));
        } catch (error) {
            console.error('Error compressing image:', error);
        }
        setIsLoading(false);
    };
    const handleFileUpload3 = async (event) => {
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
                    if(data && imgpage3.length>0){
                        try {
                            // Удаляем старое изображение
                            const deleteResponse = fetch(`${process.env.REACT_APP_API_BASE_URL}/api/delete`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ filePath: imgpage3 }), // Передаем текущую ссылку на изображение
                            });

                            const deleteResult = deleteResponse.json();
                            console.log('Удаление завершено:', deleteResult);
                        } catch (deleteError) {
                            console.error('Ошибка при удалении изображения:', deleteError);
                        }
                    }
                    setImgpage3(data.filePath);
                })
                .catch((error) => console.error('Error uploading image:', error));
        } catch (error) {
            console.error('Error compressing image:', error);
        }
        setIsLoading(false);
    };
    const handleFileUpload4 = async (event) => {
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
                    if(data && imgpage4.length>0){
                        try {
                            // Удаляем старое изображение
                            const deleteResponse = fetch(`${process.env.REACT_APP_API_BASE_URL}/api/delete`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ filePath: imgpage4 }), // Передаем текущую ссылку на изображение
                            });

                            const deleteResult = deleteResponse.json();
                            console.log('Удаление завершено:', deleteResult);
                        } catch (deleteError) {
                            console.error('Ошибка при удалении изображения:', deleteError);
                        }
                    }
                    setImgpage4(data.filePath);
                })
                .catch((error) => console.error('Error uploading image:', error));
        } catch (error) {
            console.error('Error compressing image:', error);
        }
        setIsLoading(false);
    };
    const handleFileUpload5 = async (event) => {
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
                    if(data && imgpage5.length>0){
                        try {
                            // Удаляем старое изображение
                            const deleteResponse = fetch(`${process.env.REACT_APP_API_BASE_URL}/api/delete`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ filePath: imgpage5 }), // Передаем текущую ссылку на изображение
                            });

                            const deleteResult = deleteResponse.json();
                            console.log('Удаление завершено:', deleteResult);
                        } catch (deleteError) {
                            console.error('Ошибка при удалении изображения:', deleteError);
                        }
                    }
                    setImgpage5(data.filePath);
                })
                .catch((error) => console.error('Error uploading image:', error));
        } catch (error) {
            console.error('Error compressing image:', error);
        }
        setIsLoading(false);
    };
    const handleFileUpload6 = async (event) => {
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
                    if(data && imgpage6.length>0){
                        try {
                            // Удаляем старое изображение
                            const deleteResponse = fetch(`${process.env.REACT_APP_API_BASE_URL}/api/delete`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ filePath: imgpage6 }), // Передаем текущую ссылку на изображение
                            });

                            const deleteResult = deleteResponse.json();
                            console.log('Удаление завершено:', deleteResult);
                        } catch (deleteError) {
                            console.error('Ошибка при удалении изображения:', deleteError);
                        }
                    }
                    setImgpage6(data.filePath);
                })
                .catch((error) => console.error('Error uploading image:', error));
        } catch (error) {
            console.error('Error compressing image:', error);
        }
        setIsLoading(false);
    };


    const handleClick1 = () => {
        if (fileInputRef1.current) {
            fileInputRef1.current.click();
        }
    };
    const handleClick2 = () => {
        if (fileInputRef2.current) {
            fileInputRef2.current.click();
        }
    };
    const handleClick3 = () => {
        if (fileInputRef3.current) {
            fileInputRef3.current.click();
        }
    };
    const handleClick4 = () => {
        if (fileInputRef4.current) {
            fileInputRef4.current.click();
        }
    };
    const handleClick5 = () => {
        if (fileInputRef5.current) {
            fileInputRef5.current.click();
        }
    };
    const handleClick6 = () => {
        if (fileInputRef6.current) {
            fileInputRef6.current.click();
        }
    };

    const updateZone = async () => {
        try{
            const data = await NewsService.updateZone({
                id: thiszone.id,
                name: name,
                desc: descpost,
                capter: company,
                priory: priory,
                mainimg: imgpage1,
                maindesc: img1,
                firstimg: imgpage2,
                firstdesc: img2,
                secondimg: imgpage3,
                seconddesc: img3,
                lastimg: [[imgpage4, img4], [imgpage5, img5], [imgpage6, img6]]
            })
            if(data){
                message(`Зона ${name} успешно изменена`)

                // setPoint(0)
                // setName('')
                // setImg1('')
                // setImg2('')
                // setImg3('')
                // setImg4('')
                // setImg5('')
                // setImg6('')
                // setImgpage1('')
                // setImgpage2('')
                // setImgpage3('')
                // setImgpage4('')
                // setImgpage5('')
                // setImgpage6('')
                setActivemodal(false)
            }
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        setName(thiszone.name)
        setImg1(thiszone.maindesc)
        setImg2(thiszone.firstdesc)
        setImg3(thiszone.seconddesc)
        const sets = [setImg4,setImg5,setImg6]
        const images = [setImgpage4,setImgpage5,setImgpage6]
        if(thiszone){thiszone.lastimg.map((img, index)=>{
            sets[index](img[1])
            images[index](img[0])
        })}
        setImgpage1(thiszone.mainimg)
        setImgpage2(thiszone.firstimg)
        setImgpage3(thiszone.secondimg)
        setDescpost(thiszone.desc)
        setPriory(+thiszone.priory)
    }, [thiszone])

    return(
        <div className={style.main}>
            {isLoading && <div className={style.loading}><div className={style.indicate}></div></div>}
            <div className={style.title} style={{fontSize: '16pt', fontWeight: '600'}}>Добавление нового пакета</div>

            <div className={style.set}>
                <div className={style.vid}>

                    <div className={style.datazone}>
                        <div className={style.line}>
                            <div className={style.title}>Название</div>
                            <input type="text" placeholder='' value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div className={style.line}>
                            <div className={style.title}>Описание</div>
                            <textarea className={style.desc} value={descpost} onChange={(e)=>setDescpost(e.target.value)}></textarea>
                        </div>


                    </div>

                </div>
                <div className={style.editwindow}>
                    <div className={style.topstrock}>
                        <div className={style.mainimg}>
                            <div className={style.photo}
                                 style={{backgroundImage: `url('${imgpage1}')`}}>
                            </div>
                            <input type="text" placeholder='' value={img1} onChange={(e)=>setImg1(e.target.value)}/>
                        </div>
                        <div className={style.rightimg}>
                            <div className={style.firstimg}>
                                <div className={style.photo}
                                     style={{backgroundImage: `url('${imgpage2}')`}}>
                                </div>
                                <input type="text" placeholder='' value={img2} onChange={(e)=>setImg2(e.target.value)}/>
                            </div>
                            <div className={style.secondimg}>
                                <div className={style.photo}

                                     onClick={handleClick3}
                                     style={{backgroundImage: `url('${imgpage3}')`}}>

                                </div>
                                <input type="text" placeholder='' value={img3} onChange={(e)=>setImg3(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className={style.bottomstrock}>
                        <div className={style.lastimg} style={(point === 2)?{display: 'none'}:(point === 1)?{width: 'calc(100% / 2 - 10px)'}:{}}>
                            <div className={style.photo}

                                 onClick={handleClick4}
                                 style={{backgroundImage: `url('${imgpage4}')`}}>
                            </div>
                            <input type="text" placeholder='' value={img4} onChange={(e)=>setImg4(e.target.value)}/>
                        </div>
                        <div className={style.lastimg} style={(point === 2)?{display: 'none'}:(point === 1)?{width: 'calc(100% / 2 - 10px)'}:{}}>
                            <div className={style.photo}

                                 onClick={handleClick5}
                                 style={{backgroundImage: `url('${imgpage5}')`}}>
                            </div>
                            <input type="text" placeholder='' value={img5} onChange={(e)=>setImg5(e.target.value)}/>
                        </div>
                        <div className={style.lastimg} style={(point !== 0)?{display: 'none'}:{}}>
                            <div className={style.photo}

                                 onClick={handleClick6}
                                 style={{backgroundImage: `url('${imgpage6}')`}}>
                            </div>
                            <input type="text" placeholder='' value={img6} onChange={(e)=>setImg6(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.line_btn} onClick={updateZone}>Сохранить</div>
        </div>
    )
}

export default EditZones