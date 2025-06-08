import style from './NewElement.module.scss'
import BTNs from "../buttons/BTNs";
import Frames from "../layers/Frames";

function NewElement({ isOpen, setIsOpen }){

    const handleDragStart = (e, type, name, text, table, editor) => {
        e.dataTransfer.setData('elementType', type);
        e.dataTransfer.setData('elementName', name);
        e.dataTransfer.setData('elementText', text);
        e.dataTransfer.setData('elementTable', JSON.stringify(table));
        e.dataTransfer.setData('elementEditor', editor);
    };

    const winsTable = [['Основное', 1], ['Дополнительно 1', 0], ['Дополнительно 2', 0]]


    return(
        <div className={`${style.main} ${isOpen ? style.open : ''}`}>
            <div className={style.exit} onClick={()=>{setIsOpen(false)}}><i className="fa-solid fa-xmark"/></div>
            <div className={style.name}>Elements</div>
            <div className={style.elems}>
                <div className={style.elems_proto}
                     draggable
                     onDragStart={(e) => handleDragStart(e, 'button', 'single', 'single', [], 1)}
                >
                    <BTNs btnName={'single'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'button', 'write_close', 'single', [], 2  )}
                >
                    <BTNs btnName={'write_close'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'button', 'varius', 'single', [], 3  )}
                >
                    <BTNs btnName={'varius'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'button', 'print', 'single', [], 4  )}
                >
                    <BTNs btnName={'print'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'button', 'save', 'single', [], 5  )}
                >
                    <BTNs btnName={'save'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'button', 'search', 'single', [], 6  )}
                >
                    <BTNs btnName={'search'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'button', 'mail', 'single', [], 7  )}
                >
                    <BTNs btnName={'mail'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'frame', 'windows', 'single', [['Основное', 1], ['Дополнительно 1', 0], ['Дополнительно 3', 0]], 8  )}
                >
                    <Frames frameName={'windows'} tables={[['Основное', 1], ['Доп. 1', 0], ['Доп. 3', 0]]}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'frame', 'selections', 'single', [], 9  )}
                >
                    <Frames frameName={'selections'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'frame', 'table', 'single', [], 10)}
                >
                    <Frames frameName={'table'}/>
                </div>
                <div
                    className={style.elems_proto}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'frame', 'list', 'single', [], 11 )}
                >
                    <Frames frameName={'list'}/>
                </div>
            </div>


        </div>
    )
}

export default NewElement