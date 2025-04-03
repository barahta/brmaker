import style from './styles/News.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {useEffect, useState,useRef} from "react";
import {Link, useLocation} from 'react-router-dom';
import BigModal from "../components/modalwin/BigModal";
import CreatePost from "../components/news/CreatePost";
import * as PropTypes from "prop-types";
import PlusAUP from "../components/forms/PlusAUP";
import NewsService from "../services/NewsService";
import DeleteMan from "../components/forms/DeleteMan";
import CustomVideoPlayer from "../components/players/CustomVideoPlayer";



PlusAUP.propTypes = {
    setActivemodal: PropTypes.func,
    man: PropTypes.string
};

function VideoUploader () {
    const random = Math.random() * (0.01 - 0.001) + 0.001;

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');

    const [data, setData] = useState('');
    const [activemodal, setActivemodal] = useState(false);
    const [news, setNews] = useState([]);
    const [plusman, setPlusman] = useState(false);
    const [thisPost, setThisPost] = useState({});
    const [people, setPeople] = useState([]);
    const [activedel, setActivedel] = useState(false);
    const [mandel, setMandel] = useState({});
    const fileInputRef = useRef(null);
    const [videoSrc, setVideoSrc] = useState(`/videos/${company}/video.mp4#t=${random}`);
    const [uploading, setUploading] = useState(false);

    const handleVideoUpload = async (event) => {
        event.preventDefault(); // Отменяем поведение по умолчанию

        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('video', file); // 'video' — это имя файла, используемое на сервере

        setUploading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/uploadVideo/${company}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const uniqueVideoPath = `${data.videoPath}?t=${new Date().getTime()}`; // Добавляем временной штамп к URL
                setVideoSrc(uniqueVideoPath); // Путь к видео с уникальным параметром
                console.log('Видео успешно загружено:', uniqueVideoPath);
            } else {
                console.error('Ошибка загрузки видео:', response.statusText);
            }
            await NewsService.plusVideo({ video: data.videoPath, company });
        } catch (error) {
            console.error('Ошибка во время загрузки видео:', error);
        } finally {
            setUploading(false);
            window.location.reload();
        }
    };

    const handleClick = (event) => {
        event.preventDefault(); // Отменяем поведение по умолчанию
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        setVideoSrc(`/videos/${company}/video.mp4#t=${random}`);
    }, [company]);

    return (
        <div className={style.bodymain}>
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
                        <div className={style.pluspost}>
                            <i className="fa-solid fa-plus"/>
                            <div className={style.namebtn}>Добавить сотрудника</div>
                        </div>
                    </div>

                    {(company)&&(
                        <div className={style.list}>
                            <div>
                                <h2>Загрузчик видео</h2>
                                <div>
                                    <button type="button" onClick={handleClick}>Выбрать видео</button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleVideoUpload}
                                        accept="video/*"
                                    />
                                </div>
                                {uploading && <p>Загрузка видео...</p>}
                                    <div>
                                        <h3>Загруженное видео:</h3>
                                        <CustomVideoPlayer src={`${videoSrc}#t=0.005`}/>
                                    </div>
                            </div>

                        </div>
                    )}
                </div>
                {/*<div className={style.rightpath}></div>*/}
            </div>


        </div>
    )
}

export default VideoUploader