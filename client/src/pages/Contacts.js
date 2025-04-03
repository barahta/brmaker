import style from './styles/Contacts.module.scss';
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useMessage } from "../hooks/message.hook";
import NewsService from "../services/NewsService";
import React, { useRef } from "react";
import imageCompression from "browser-image-compression";
import PlusPack from "../components/forms/PlusPack";
import BigModal from "../components/modalwin/BigModal";
import * as PropTypes from "prop-types";
import PlusCity from "../components/forms/PlusCity";


function Contacts() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();
    const [city, setCity] = useState('')
    const [indexcity, setIndexCity] = useState('')
    const [allCity, setAllCity] = useState([])
    const [activemodal, setActivemodal] = useState(false)
    const [data, setData] = useState('')


    const [newphone, setNewPhone] = useState('')
    const [phones, setPhones] = useState([])
    const [newadress, setNewAdress] = useState('')
    const [adresses, setAdresses] = useState([])
    const [newaemail, setNewEmail] = useState('')
    const [emails, setEmails] = useState([])
    const [mapW, setMapW] = useState('')
    const [mapH, setMapH] = useState('')
    const [vk, setVK] = useState('')
    const [ok, setOK] = useState('')
    const [instagram, setInstagram] = useState('')
    const [telegram, setTelegram] = useState('')
    const [youtube, setYoutube] = useState('')

    const plusContactParam = async (category) => {
        let newarr = []
        if(category === 'phone' && newphone.length > 5){
            newarr = [...phones]
            newarr.push(newphone)
            setPhones(newarr)
            setNewPhone('')
        }
        if(category === 'adress' && newadress.length > 5){
            newarr = [...adresses]
            newarr.push(newadress)
            setAdresses(newarr)
            setNewAdress('')
        }
        if(category === 'email' && newaemail.length > 5){
            newarr = [...emails]
            newarr.push(newaemail)
            setEmails(newarr)
            setNewEmail('')
        }

        if((newphone.length>2 || newadress.length>2 || newaemail.length>2) && category.length>0){
            const {data} = await NewsService.plusContactParam({capter: company, city: city, category, value: newarr})
        }else{
            message('Указаны не все параметры')
        }
    }

    const loadContacts = () => {
        const thisContact = allCity.find(cityObj => cityObj.city === city)
        if(thisContact){
            setPhones(thisContact.phone)
            setAdresses(thisContact.adress)
            setEmails(thisContact.email)
            setMapW(thisContact.mapw)
            setMapH(thisContact.maph)
            setVK(thisContact.vk)
            setOK(thisContact.ok)
            setInstagram(thisContact.instagram)
            setTelegram(thisContact.telegram)
            setYoutube(thisContact.youtube)
        }

    }

    const handlerStatics = async (value, category) => {
        if(city.length>0 && company.length>0){
            try{
                if(category === 'mapw')setMapW(value)
                if(category === 'maph')setMapH(value)
                if(category === 'vk')setVK(value)
                if(category === 'ok')setOK(value)
                if(category === 'instagram')setInstagram(value)
                if(category === 'telegram')setTelegram(value)
                if(category === 'youtube')setYoutube(value)

                if(category !== 'mapw' && category !== 'maph' && category !== 'vk' && category !== 'ok' && category !== 'instagram' && category !== 'telegram' && category !== 'youtube'){
                    message('Что-то пошло не так, попробуйте еще раз')
                }else{
                    const {data} = await NewsService.uploadStaticContact({capter: company, city: city, category, value})
                }
            }catch(e){
                console.log(e)
                message('Что-то пошло не так')
            }
        }else{
            message('Проверьте выбран ли город и компания')
        }
    }

    const getCities = async () => {
        try{
            const {data} = await NewsService.getCities({capter: company})
            setAllCity(data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getCities()
    }, [activemodal])

    useEffect(()=>{
        loadContacts()
    }, [city])

    return (
        <div className={style.bodymain}>
            <BigModal data={<PlusCity com={company} setCity={setCity} setActivemodal={setActivemodal}/>} activemodal={activemodal} setActivemodal={setActivemodal} setData={setData}/>
            <HeaderMain page={`./${company}/ Контакты `} />
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
                        <div className={style.pluspost} onClick={()=>setActivemodal(true)}>
                            <i className="fa-solid fa-plus" />
                            <div className={style.namebtn}>Добавить город</div>
                        </div>
                    </div>
                    <div className={style.contants}>
                        <div className={style.cities}>
                            <select className={style.selectcity} onChange={(e)=>{setCity(e.target.value)}}>
                                <option></option>
                                {(allCity)&&allCity.map((contact, indexContact)=>(
                                    <option key={indexContact}>{contact.city}</option>
                                ))}
                            </select>
                            <div className={style.btn}>Удалить</div>
                        </div>
                        <div className={style.maincontact} style={(city.length>0)?{display:'flex'}:{display:'none'}}>
                            <div className={style.phone}>
                                <div className={style.plus}>
                                    <input type="text" placeholder='Номер телефона' value={newphone} onChange={(e)=>setNewPhone(e.target.value)}/>
                                    <div className={style.btn} onClick={()=>plusContactParam('phone')}>Добавить</div>
                                </div>
                                <div className={style.list}>
                                    {(phones)&&phones.map((ph, indexPhone)=>(
                                        <div className={style.elem} key={indexPhone}>
                                            <div className={style.point}></div>
                                            <div className={style.number}>{ph}</div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div className={style.adress}>
                                <div className={style.plus}>
                                    <input type="text" placeholder='Адрес' value={newadress} onChange={(e)=>setNewAdress(e.target.value)}/>
                                    <div className={style.btn} onClick={()=>plusContactParam('adress')}>Добавить</div>
                                </div>
                                <div className={style.list}>
                                    {(adresses)&&adresses.map((adress, indexAdress)=>(
                                        <div className={style.elem} key={indexAdress}>
                                            <div className={style.point}></div>
                                            <div className={style.number}>{adress}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={style.electroncontact} style={(city.length>0)?{display:'flex'}:{display:'none'}}>
                            <div className={style.email}>
                                <div className={style.plus}>
                                    <input type="text" placeholder='Email@site.ru' value={newaemail} onChange={(e)=>setNewEmail(e.target.value)}/>
                                    <div className={style.btn} onClick={()=>plusContactParam('email')}>Добавить</div>
                                </div>
                                <div className={style.list}>
                                    {(emails)&&emails.map((email, indexEmail)=>(
                                        <div className={style.elem} key={indexEmail}>
                                            <div className={style.point}></div>
                                            <div className={style.number}>{email}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={style.map}>
                                <div className={style.title}>Обозначение на карте</div>
                                <div className={style.coordinat}>
                                    <div className={style.name}>Широта:</div>
                                    <input type="text" placeholder='61.254627' value={mapW} onChange={(e)=>handlerStatics(e.target.value, 'mapw')}/>
                                </div>
                                <div className={style.coordinat}>
                                    <div className={style.name}>Долгота:</div>
                                    <input type="text" placeholder='73.425920' value={mapH} onChange={(e)=>handlerStatics(e.target.value, 'maph')}/>
                                </div>
                            </div>
                        </div>
                        <div className={style.socialcontact} style={(city.length>0)?{display:'flex'}:{display:'none'}}>
                            <div className={style.soclist}>
                                <div className={style.line}>
                                    <div className={style.name}>
                                        <i className="fa-brands fa-odnoklassniki"/>
                                        OK.RU
                                    </div>
                                    <input type="text" placeholder='Одноклассники' value={vk} onChange={(e)=>handlerStatics(e.target.value, 'vk')}/>
                                </div>
                                <div className={style.line}>
                                    <div className={style.name}>
                                        <i className="fa-brands fa-vk"/>
                                        VK.COM
                                    </div>
                                    <input type="text" placeholder='Вконтакте' value={ok} onChange={(e)=>handlerStatics(e.target.value, 'ok')}/>
                                </div>
                                <div className={style.line}>
                                    <div className={style.name}>
                                        <i className="fa-brands fa-instagram"/>
                                        Instagram (устанавливается с отметкой)
                                    </div>
                                    <input type="text" placeholder='Instagram *' value={instagram} onChange={(e)=>handlerStatics(e.target.value, 'instagram')}/>
                                </div>
                                <div className={style.line}>
                                    <div className={style.name}>
                                        <i className="fa-brands fa-telegram"/>
                                        telegram
                                    </div>
                                    <input type="text" placeholder='telegram' value={telegram} onChange={(e)=>handlerStatics(e.target.value, 'telegram')}/>
                                </div>
                                <div className={style.line}>
                                    <div className={style.name}>
                                        <i className="fa-brands fa-youtube"/>
                                        Youtube
                                    </div>
                                    <input type="text" placeholder='Youtube' value={youtube} onChange={(e)=>handlerStatics(e.target.value, 'youtube')}/>
                                </div>
                            </div>
                        </div>
                        <div className={style.captercity} style={(city.length>0)?{display:'none'}:{display:'flex'}}>
                            <i className="fa-solid fa-circle-exclamation"/>
                            <div className={style.mess}>Необходимо выбрать или добавить город</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacts;