import style from './NewLayer.module.scss'
import {useState} from "react";

function NewLayer({net, setNet}){
    const [blocks, setBlocks] = useState(0)
    const [boxes, setBoxes] = useState([])

    const plusBlock = (pos, level, index) => {
        if(level === 1){
            setBlocks(1)

            if(pos === 'right' || pos === 'left'){
                const newarr = [...boxes]
                const startvertical = [
                    {
                        box: 1,
                        level: 1,
                        pos: 1,
                        width: 50,
                        height: 100,
                        douther: [],
                        components: []
                    },
                    {
                        box: 2,
                        level: 1,
                        pos: 1,
                        width: 50,
                        height: 100,
                        douther: [],
                        components: []
                    },
                ]
                startvertical.forEach((elem)=>{
                    newarr.push(elem)
                })
                console.log(newarr)
                setBoxes(newarr)
            }

            if(pos === 'top' || pos === 'bottom'){
                const newarr = [...boxes]
                const startvertical = [
                    {
                        box: 1,
                        level: 1,
                        pos: 2,
                        width: 100,
                        height: 50,
                        douther: [],
                        components: []
                    },
                    {
                        box: 2,
                        level: 1,
                        pos: 2,
                        width: 100,
                        height: 50,
                        douther: [],
                        components: []
                    },
                ]
                startvertical.forEach((elem)=>{
                    newarr.push(elem)
                })
                console.log(newarr)
                setBoxes(newarr)
            }
        }

        if(level === 2){
            setBlocks(2)

            if(pos === 'right' || pos === 'left'){
                const newarr = [
                    {
                        box: 1,
                        level: 2,
                        pos: 1,
                        width: 50,
                        height: 100,
                        douther: [],
                        components: []
                    },
                    {
                        box: 2,
                        level: 2,
                        pos: 1,
                        width: 50,
                        height: 100,
                        douther: [],
                        components: []
                    },
                ]

                const newSet = [...boxes]
                newSet[index].douther = newarr

                setBoxes(newSet)

                console.log(boxes)
            }
            if(pos === 'top' || pos === 'bottom'){


                const newarr = [
                    {
                        box: 1,
                        level: 2,
                        pos: 2,
                        width: 100,
                        height: 50,
                        douther: [],
                        components: []
                    },
                    {
                        box: 2,
                        level: 2,
                        pos: 2,
                        width: 100,
                        height: 50,
                        douther: [],
                        components: []
                    },
                ]

                const newSet = [...boxes]
                newSet[index].douther = newarr

                setBoxes(newSet)

                console.log(boxes)
            }
        }
    }

    return(
        <div className={style.main}>
            <div className={style.startline}>
                <div className={style.title_left_right}>
                    <div className={style.btn_tit_left}><img src="/components/buttons/tit_left.svg" alt=""/></div>
                    <div className={style.btn_tit_right}><img src="/components/buttons/tit_right.svg" alt=""/></div>
                </div>
                <input type="text" placeholder="Название новой страницы"/>
            </div>

            <div className={`${style.workplace} ${(blocks === 0)?style.activity:''} ${(net)?style.net:''}`} style={(boxes.length && boxes[0].pos===1)?{flexDirection: 'row'}:{}}>
                <div className={style.plusblock_vertical} style={(blocks===0)?{display: 'flex'}:{}} onClick={()=>plusBlock('right', 1)}>
                    <div className={style.shpere_plus}><i className="fa-solid fa-plus"/></div>
                </div>
                <div className={style.plusblock_gorizont} style={(blocks===0)?{display: 'flex'}:{}} onClick={()=>plusBlock('bottom', 1)}>
                    <div className={style.shpere_plus}><i className="fa-solid fa-plus"/></div>
                </div>
                <div className={style.plusblock_vertical_left} style={(blocks===0)?{display: 'flex'}:{}} onClick={()=>plusBlock('left', 1)}>
                    <div className={style.shpere_plus_left}><i className="fa-solid fa-plus"/></div>
                </div>
                <div className={style.plusblock_gorizont_up} style={(blocks===0)?{display: 'flex'}:{}} onClick={()=>plusBlock('top', 1)}>
                    <div className={style.shpere_plus_up}><i className="fa-solid fa-plus"/></div>
                </div>

                {
                    boxes.map((box, indexFirst)=>(
                        <div key={indexFirst} className={`${(box.pos === 1)?style.boxelem_1_gorizont:style.boxelem_1_vertical} ${(blocks === 1)?style.activity:''}`}
                             style={(box.douther[0] && box.douther[0].pos === 1)?{width: `${box.width}%`, height: `${box.height}%`, display: 'flex', flexDirection: 'row'}:{width: `${box.width}%`, height: `${box.height}%`, display: 'flex', flexDirection: 'column'}}
                        >
                            <div className={style.plusblock_vertical} style={(box.douther !== 0)?{display: 'flex'}:{}} onClick={()=>plusBlock('right', 2, indexFirst)}>
                                <div className={style.shpere_plus}><i className={(box.pos === 1)?"fa-solid fa-arrow-left":"fa-solid fa-plus"}/></div>
                            </div>
                            <div className={style.plusblock_gorizont} style={(box.douther !== 0)?{display: 'flex'}:{}} onClick={()=>plusBlock('bottom', 2, indexFirst)}>
                                <div className={style.shpere_plus}><i className={(box.pos === 1)?"fa-solid fa-plus":"fa-solid fa-arrow-up"}/></div>
                            </div>
                            <div className={style.plusblock_vertical_left} style={(box.douther !== 0)?{display: 'flex'}:{}} onClick={()=>plusBlock('left', 2, indexFirst)}>
                                <div className={style.shpere_plus_left}><i className={(box.pos === 1)?"fa-solid fa-arrow-right":"fa-solid fa-plus"}/></div>
                            </div>
                            <div className={style.plusblock_gorizont_up} style={(box.douther !== 0)?{display: 'flex'}:{}} onClick={()=>plusBlock('top', 2, indexFirst)}>
                                <div className={style.shpere_plus_up}><i className={(box.pos === 1)?"fa-solid fa-plus":"fa-solid fa-arrow-down"}/></div>
                            </div>


                            {box.douther.map((dot, indexFirst)=>(
                                <div key={indexFirst} className={`${(dot.pos === 1)?style.boxelem_1_gorizont:style.boxelem_1_vertical} ${(blocks === 2)?style.activity:''}`}
                                     style={(dot.pos === 1)?{width: `${dot.width}%`, height: `${dot.height}%`, display: 'flex', flexDirection: 'column'}:{width: `${dot.width}%`, height: `${dot.height}%`, display: 'flex', flexDirection: 'row'}}
                                >
                                    <div className={style.plusblock_vertical} style={(dot.douther !== 0)?{display: 'flex'}:{}} onClick={()=>plusBlock('right', 2, indexFirst)}>
                                        <div className={style.shpere_plus}><i className={(dot.pos === 1)?"fa-solid fa-arrow-left":"fa-solid fa-plus"}/></div>
                                    </div>
                                    <div className={style.plusblock_gorizont} style={(dot.douther !== 0)?{display: 'flex'}:{}} onClick={()=>plusBlock('bottom', 2, indexFirst)}>
                                        <div className={style.shpere_plus}><i className={(dot.pos === 1)?"fa-solid fa-plus":"fa-solid fa-arrow-up"}/></div>
                                    </div>
                                    <div className={style.plusblock_vertical_left} style={(dot.douther !== 0)?{display: 'flex'}:{}} onClick={()=>plusBlock('left', 2, indexFirst)}>
                                        <div className={style.shpere_plus_left}><i className={(dot.pos === 1)?"fa-solid fa-arrow-right":"fa-solid fa-plus"}/></div>
                                    </div>
                                    <div className={style.plusblock_gorizont_up} style={(dot.douther !== 0)?{display: 'flex'}:{}} onClick={()=>plusBlock('top', 2, indexFirst)}>
                                        <div className={style.shpere_plus_up}><i className={(dot.pos === 1)?"fa-solid fa-plus":"fa-solid fa-arrow-down"}/></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default NewLayer