import React, {useRef,useEffect, useState} from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import style from './CreateGroupComStyle.module.scss';
import {useMessage} from "../../hooks/message.hook";
import NewsService from "../../services/NewsService";

function CreateGroupCom({setActivemodal}) {
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
            name: 'ТРАЕКТОРИЯ НАДЕЖДЫ',
            active: false
        },
        {
            name: 'СУРГУТ 24',
            active: false
        },
        {
            name: 'ВЕРНЫЙ ДРУГ',
            active: false
        },
        {
            name: 'THE KITCHA',
            active: false
        },
        {
            name: 'OMEDIA!',
            active: false
        }
    ]
    const message = useMessage();
    const [publiccom, setPubliccom] = useState(coms)

    const [viewcom, setViewcom] = useState()

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
    const [urlsite, setUrlsite] = useState('');
    const fileInputRef = useRef(null);
    const fileInputRefLogo = useRef(null);
    const [imgpage, setImgpage] = useState('');
    const [imglogo, setImglogo] = useState('');
    const [newContact, setNewContact] = useState('')
    const [listContact, setListContact] = useState([])
    const [numposition, setNumposition] = useState(0)

    const createGroupCom = async () => {
        console.log('start')
        try{
            const name = namepost
            const desc = descpost
            const contacts = listContact
            const site = urlsite
            const logo = imglogo
            const img = imgpage
            const num = numposition

            const {data} = await NewsService.plusCompany({name,desc,contacts,site,logo,img,num})
            if(data){
                setActivemodal(false)
                message(`О! ${namepost} успешно добавлено`)
                setNamepost('')
                setDescpost('')
                setUrlsite('')
                setImgpage('')
                setImglogo('')
                setListContact([])
                setNumposition(0)
            }

        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        console.log(imgpage)
    }, [imgpage])
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

    const handleFileUploadLogo = (event) => {
        const formData = new FormData();
        formData.append('image', event.target.files[0]);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/upload`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setImglogo(data.filePath);
            })
            .catch(error => console.error('Error uploading image:', error));
    };

    const handleClickLogo = () => {
        if (fileInputRefLogo.current) {
            fileInputRefLogo.current.click();
        }
    };

    const deletContact = index => {
            const newarr = [...listContact]
            newarr.splice(index, 1)
            setListContact(newarr)
    }

    const plusContact = () => {
        const newarr = [...listContact]
        if(newContact.length>0){
            newarr.push(newContact)
            setListContact(newarr)
            setNewContact('')
        }else{
            message('Введите контакт')
        }
    }

    useEffect(()=>{
        setViewcom(coms)
    }, [])
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={style.main}>
                <div className={style.left}>
                    <div className={style.nameblock} style={{justifyContent: 'center', textAlign:'center', marginBottom: '20px'}}>Загрузите логотип компании</div>
                    <div
                        className={style.photo}
                        onClick={handleClickLogo}
                        style={(imglogo.length>0)?{backgroundImage: `url('${imglogo}')`}:{backgroundImage: `url('/files/news/nophoto.svg')`}}>
                        <div className={style.active}><i className="fa-solid fa-plus"/></div>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRefLogo}
                        style={{ display: 'none' }}
                        onChange={handleFileUploadLogo}
                        accept="image/*"
                    />
                </div>

                <div className={style.center}>
                    <div
                        className={style.photo}
                        onClick={handleClick}
                        style={(imgpage.length>0)?{backgroundImage: `url('${imgpage}')`}:{backgroundImage: `url('/files/news/nophoto.svg')`}}>
                        <div className={style.active}><i className="fa-solid fa-plus"/></div>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        accept="image/*"
                    />
                    <br/>
                    <div className={style.nameblock}>Название компании</div>
                    <input className={style.title} value={namepost} onChange={(e)=>setNamepost(e.target.value)}/>
                    <br/>
                    <div className={style.nameblock}>Краткое описание новости</div>
                    <textarea className={style.desc} value={descpost} onChange={(e)=>setDescpost(e.target.value)}></textarea>
                    <br/>
                    <div className={style.nameblock}>URL (ссылка)</div>
                    <input className={style.title} value={urlsite} onChange={(e)=>setUrlsite(e.target.value)} placeholder='Укажите ссылку на сайта'/>
                </div>

                <div className={style.right}>
                    <div className={style.up}>
                        <div className={style.title}>Контакты:</div>
                        <input className={style.titleinput} value={newContact} onChange={(e)=>setNewContact(e.target.value)}/>
                        <div className={style.btnplus} onClick={plusContact}>Добавить</div>
                        <div className={style.listcom}>
                            {listContact.map((contact, indexcontact)=>(
                                <div key={indexcontact} className={style.contactlist}>{contact} <i className="fa-solid fa-trash" onClick={()=>deletContact(indexcontact)}/></div>
                            ))}
                        </div>
                    </div>
                    <div className={style.bottom}>
                        <div className={style.numposition}>
                            <div className={style.textpos}>Позиция в списке:</div>
                            <input className={style.numpos} value={numposition} onChange={(e)=>setNumposition(e.target.value)}/>
                        </div>
                        <div className={style.saving} onClick={createGroupCom}>
                            <i className="fa-regular fa-floppy-disk"/>
                            <div className={style.text}>Сохранить</div>
                        </div>
                    </div>

                </div>
            </div>
        </DndProvider>
    );
}

export default CreateGroupCom;