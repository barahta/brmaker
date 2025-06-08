import style from './styles/Main.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {useParams} from "react-router-dom";
import Buttons from "../components/buttons/Buttons";
import ChihardaTable from "../components/tabels/Chiharda";
import html2canvas from 'html2canvas';
import {useEffect, useState} from "react";
import ThisProjectParams from "../components/projects/ThisProjectParams";
import NewElement from "../components/nav/NewElement";
import NewLayer from "../components/layers/NewLayer";
import EditElementWin from "../components/windows/funtionWindows/EditElementWin";
import EditBlockWin from "../components/windows/funtionWindows/EditBlockWin";
import Bear from "../components/chat/Bear";

function ThisProject () {
    const params = useParams()
    const [isOpen, setIsOpen] = useState(false);
    const [net, setNet] = useState(false);
    const projectParam = params.project
    const [winEditEnter, setWinEditEnter] = useState(false)
    const [winEditBlock, setWinEditBlock] = useState(false)
    const [elements, setElements] = useState([]);
    const [editElem, setEditElem] = useState({})

    const captureAndShowImage = async () => {
        try {
            const backimage = document.getElementById('backimage')
            const capturedCanvas = await html2canvas(backimage); // захват всего body
            const imgSrc = capturedCanvas.toDataURL("image/png");
            window.localStorage.setItem('referenceImage', imgSrc); // сохраним картинку в localStorage
        } catch(e) {
            console.error('Ошибка захвата:', e);
        }
    };


    const togglePanel = () => {
        setIsOpen(!isOpen);
    };
    useEffect(()=>{
        captureAndShowImage()
    }, [])

    return (
        <div className={style.bodymain}>
            <Bear />
            <NewElement  isOpen={isOpen} setIsOpen={setIsOpen}/>
            <EditElementWin winEditEnter={winEditEnter} setWinEditEnter={setWinEditEnter} elements={elements} setElements={setElements} editElem={editElem} setEditElem={setEditElem} winEditBlock={winEditBlock} setWinEditBlock={setWinEditBlock}/>
            <EditBlockWin winEditBlock={winEditBlock} setWinEditBlock={setWinEditBlock} elements={elements} setElements={setElements} editElem={editElem} setEditElem={setEditElem}/>
            <HeaderMain page={'./projectParam'}/>
            <div className={style.main}>
                <div className={style.leftpath}>
                    <Navigation />
                </div>
                <div className={style.centerpath} id={'backimage'}>
                    <ThisProjectParams isOpen={isOpen} setIsOpen={setIsOpen} net={net} setNet={setNet}/>

                    <NewLayer net={net} setNet={setNet} winEditEnter={winEditEnter} setWinEditEnter={setWinEditEnter} elements={elements} setElements={setElements} editElem={editElem} setEditElem={setEditElem}/>
                    {/*<Buttons />*/}
                    {/*<ChihardaTable />*/}
                </div>
                <div className={style.rightpath}></div>
            </div>
        </div>
    )
}

export default ThisProject