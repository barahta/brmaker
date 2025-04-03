import React, { useRef, useState } from 'react';
import style from './CreateCom.module.scss';
import CompanyService from "../../services/CompanyService";

function CreatePost({setNewcom, setActivemodal}) {



    const [name, setName] = useState('');
    const fileInputRef = useRef(null);
    const [imgpage, setImgpage] = useState('');

    const plusCom = async () => {
        try{
            const {data} = CompanyService.createCompany({imgpage, name})
            if(data){
                setNewcom(data)
                setActivemodal(false)
            }
        }catch(e){
            console.log(e)
        }
    }

    const handleFileUpload = (event) => {
        const formData = new FormData();
        formData.append('image', event.target.files[0]);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/upload`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setImgpage(data.filePath);
            })
            .catch(error => console.error('Error uploading image:', error));
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={style.main}>
            <div
                className={style.companyplus}
                onClick={handleClick}
                style={{ backgroundImage: `url('${imgpage}')` }}>
                <i className="fa-solid fa-plus"/>
                <div className={style.active}></div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                accept="image/*"
            />

            <label>Название Сайта</label>
            <input type="text" className={style.into} value={name} onChange={e => setName(e.target.value)} />
            <div className={style.btn} onClick={plusCom}>Создать</div>
        </div>
    );
}

export default CreatePost;