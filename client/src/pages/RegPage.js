import style from './styles/News.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import AuthService from "../services/AuthService";


function RegPage () {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')



    useEffect(()=>{

    },[])
    return (
        <div className={style.bodymain}>
            <HeaderMain page={`./Пользователи`}/>
            <div className={style.main}>
                <div className={style.leftpath}>
                    <Navigation />
                </div>
                <div className={style.centerpath}>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                </div>
                {/*<div className={style.rightpath}></div>*/}
            </div>


        </div>
    )
}

export default RegPage