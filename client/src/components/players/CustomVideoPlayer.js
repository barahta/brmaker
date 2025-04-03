import React, { useRef, useState } from 'react';
import style from './CustomVideoPlayer.module.scss'; // Подключите свой CSS файл для стилизации

const CustomVideoPlayer = ({ src }) => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1); // Начальная громкость

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (playing) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setPlaying(!playing);
        }
    };

    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    const handleRewind = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 10; // Перемотка на 10 секунд назад
        }
    };

    const handleForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10; // Перемотка на 10 секунд вперед
        }
    };

    return (
        <div className={style.videoPlayer}>
            <video ref={videoRef} src={src} width="640" controls={false} />
            <div className={style.controls}>
                <button onClick={handlePlayPause}>
                    {playing ? 'Пауза' : 'Воспроизвести'}
                </button>
                <button onClick={handleRewind}>⏪ -10 сек</button>
                <button onClick={handleForward}>+10 сек ⏩</button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </div>
    );
};

export default CustomVideoPlayer;