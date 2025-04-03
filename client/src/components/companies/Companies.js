import style from './Companies.module.scss'
import BigModal from "../modalwin/BigModal";
import CreateCom from "./CreateCom";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

function Companies (){

    const [activemodal, setActivemodal] = useState(false)
    const [data, setData] = useState('')
    const [newcom, setNewcom] = useState('')
    const [user, setUser] = useState('');
    const [login, setLogin] = useState('');
    const [admin, setAdmin] = useState(false);
    const [avatar, setAvatar] = useState('');
    const plusCompany = () => {
        setActivemodal(true)
    }
    const getCompanies = async () => {
        try{

        }catch(e){

        }
    }
    useEffect(()=>{
        getCompanies()
    },[newcom])

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        const storedLogin = localStorage.getItem('login');
        const storedAdmin = localStorage.getItem('admin');
        const storedAvatar = localStorage.getItem('avatar');
        if (storedUser) {
            setUser(storedUser);
            setLogin(storedLogin);
            setAdmin(storedAdmin);
            setAvatar(storedAvatar);
        }
    },[])
    return (
        <div className={style.main}>

            <BigModal data={<CreateCom setNewcom={setNewcom} setActivemodal={setActivemodal}/>} activemodal={activemodal} setActivemodal={setActivemodal} setData={setData}/>
            <Link to='/company?com=omedia' className={style.company} style={(avatar === 'omedia' || admin === true || login === 'barahtasurgut')?{}:{display: 'none'}}>
                <img src="/files/logos/omedia.svg" alt=""/>
                <div className={style.active}></div>
            </Link>
            <Link to='/company?com=hopekids' className={style.company} style={(avatar === 'hopekids' || admin === true || login === 'barahtasurgut')?{}:{display: 'none'}}>
                <img src="/files/companies/hopekids.svg" alt=""/>
                <div className={style.active}></div>
            </Link>
            <Link to='/company?com=reafarm' className={style.company} style={(avatar === 'reafarm' || admin === true || login === 'barahtasurgut')?{}:{display: 'none'}}>
                <img src="/files/companies/reafarm.svg" alt=""/>
                <div className={style.active}></div>
            </Link>
            <Link to='/company?com=hopefitness' className={style.company} style={(avatar === 'hopefitness' || admin === true || login === 'barahtasurgut')?{}:{display: 'none'}}>
                <img src="/files/companies/hopefitness.svg" alt=""/>
                <div className={style.active}></div>
            </Link>
            <Link to='/company?com=aviatech' className={style.company} style={(avatar === 'aviatech' || admin === true || login === 'barahtasurgut')?{}:{display: 'none'}}>
                <img src="/files/companies/aviatech.svg" alt=""/>
                <div className={style.active}></div>
            </Link>
            <Link to='/company?com=music' className={style.company} style={(avatar === 'music' || admin === true || login === 'barahtasurgut')?{}:{display: 'none'}}>
                <img src="/files/companies/music.svg" alt=""/>
                <div className={style.active}></div>
            </Link>
            {/*<Link to='/company?com=music' className={style.company}>*/}
            {/*    <img src="/files/companies/24surgut.svg" alt=""/>*/}
            {/*    <div className={style.active}></div>*/}
            {/*</Link>*/}
            {/*<Link to='/company?com=thekitcha' className={style.company}>*/}
            {/*    <img src="/files/companies/thekitcha.svg" alt=""/>*/}
            {/*    <div className={style.active}></div>*/}
            {/*</Link>*/}
            {/*<Link to='/company?com=verniydrug' className={style.company}>*/}
            {/*    <img src="/files/companies/verniydrug.svg" alt=""/>*/}
            {/*    <div className={style.active}></div>*/}
            {/*</Link>*/}
            {/*<Link to='/company?com=traektiriyanadezhdi' className={style.company}>*/}
            {/*    <img src="/files/companies/traektoriya.svg" alt=""/>*/}
            {/*    <div className={style.active}></div>*/}
            {/*</Link>*/}
            {/*<div className={style.companyplus} onClick={plusCompany}>*/}
            {/*    <i className="fa-solid fa-plus"/>*/}
            {/*    <div className={style.active}></div>*/}
            {/*</div>*/}

        </div>
    )
}

export default Companies