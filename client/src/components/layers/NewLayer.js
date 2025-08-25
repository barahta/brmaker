import style from './NewLayer.module.scss';
import {useState, useRef, useEffect} from "react";
import BTNs from "../buttons/BTNs";
import Frames from "./Frames";

function NewLayer({ net, setNet, winEditEnter, setWinEditEnter, elements, setElements, editElem, setEditElem }) {
    const [blocks, setBlocks] = useState(0);
    const [boxes, setBoxes] = useState([]);
    const [selectedElements, setSelectedElements] = useState(new Set());
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionBox, setSelectionBox] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const workplaceRef = useRef(null);
    const elementsRef = useRef([]);
    const dragData = useRef({
        startX: 0,
        startY: 0,
        elementIds: [],
        originalPositions: []
    });

    useEffect(()=>{
        // console.log(selectedElements.size)
        if(!selectedElements.size){
            setWinEditEnter(false)
        }else{
            setWinEditEnter(true)
        }

    },[selectedElements])

    const openEditWin = (element, element_id, onclock) => {

        setEditElem(element)



    }



    const [editingElementId, setEditingElementId] = useState(null);
    const [editText, setEditText] = useState('');

// Обработчик двойного клика
    const handleDoubleClick = (event, element) => {
        event.stopPropagation();
        if (element.type === 'button') {
            setEditingElementId(element.id);
            setEditText(element.text);
        }
    };

    // Сохранение текста при редактировании
    const handleTextSave = (event, elementId) => {
        if (event.key === 'Enter' || event.type === 'blur') {
            setElements(prev => prev.map(el =>
                el.id === elementId ? { ...el, text: editText } : el
            ));
            setEditingElementId(null);
        }
    };

    const handleMouseDown = (event) => {
        if (event.target === workplaceRef.current) {
            setIsSelecting(true);
            const rect = workplaceRef.current.getBoundingClientRect();
            setSelectionBox({
                startX: event.clientX - rect.left,
                startY: event.clientY - rect.top,
                endX: event.clientX - rect.left,
                endY: event.clientY - rect.top
            });
        }
    };

    const handleMouseMove = (event) => {
        if (isSelecting) {
            const rect = workplaceRef.current.getBoundingClientRect();
            setSelectionBox(previousSelectionBox => ({
                ...previousSelectionBox,
                endX: event.clientX - rect.left,
                endY: event.clientY - rect.top
            }));
        } else if (isDragging) {
            const rect = workplaceRef.current.getBoundingClientRect();
            const deltaX = event.clientX - rect.left - dragData.current.startX;
            const deltaY = event.clientY - rect.top - dragData.current.startY;

            setElements(previousElements => previousElements.map(element => {
                if (dragData.current.elementIds.includes(element.id)) {
                    const originalPosition = dragData.current.originalPositions.find(position => position.id === element.id);
                    return {
                        ...element,
                        x: originalPosition.x + deltaX,
                        y: originalPosition.y + deltaY
                    };
                }
                return element;
            }));
        }
    };

    const handleMouseUp = () => {
        if (isSelecting) {
            setIsSelecting(false);

            const newSelectedElements = new Set();
            elements.forEach((element, index) => {
                const elementNode = elementsRef.current[index];
                if (elementNode) {
                    const elementRect = elementNode.getBoundingClientRect();
                    const workplaceRect = workplaceRef.current.getBoundingClientRect();
                    const elementLeft = elementRect.left - workplaceRect.left;
                    const elementTop = elementRect.top - workplaceRect.top;
                    const elementRight = elementLeft + elementRect.width;
                    const elementBottom = elementTop + elementRect.height;

                    const selectionStartX = Math.min(selectionBox.startX, selectionBox.endX);
                    const selectionStartY = Math.min(selectionBox.startY, selectionBox.endY);
                    const selectionEndX = Math.max(selectionBox.startX, selectionBox.endX);
                    const selectionEndY = Math.max(selectionBox.startY, selectionBox.endY);

                    if (elementLeft < selectionEndX &&
                        elementRight > selectionStartX &&
                        elementTop < selectionEndY &&
                        elementBottom > selectionStartY) {
                        newSelectedElements.add(element.id);
                    }
                }
            });
            setSelectedElements(newSelectedElements);
            setSelectionBox(null);
        }
        setIsDragging(false);
    };

    const handleElementMouseDown = (event, id) => {
        event.stopPropagation();

        const rect = workplaceRef.current.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        let elementsToDrag = [];
        if (selectedElements.has(id) && selectedElements.size > 1) {
            elementsToDrag = Array.from(selectedElements);
        } else {
            elementsToDrag = [id];
            setSelectedElements(new Set([id]));
        }

        dragData.current = {
            startX: mouseX,
            startY: mouseY,
            elementIds: elementsToDrag,
            originalPositions: elementsToDrag.map(elementId => {
                const element = elements.find(e => e.id === elementId);
                return { id: elementId, x: element.x, y: element.y };
            })
        };

        setIsDragging(true);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const type = event.dataTransfer.getData('elementType');
        const name = event.dataTransfer.getData('elementName');
        const text = event.dataTransfer.getData('elementText');
        const editor = event.dataTransfer.getData('elementEditor');
        const settings = JSON.parse(event.dataTransfer.getData('elementSet') || '[{connect:[]}]');
        const table = JSON.parse(event.dataTransfer.getData('elementTable') || '[]')
        const rect = workplaceRef.current.getBoundingClientRect();

        setElements(previousElements => [
            ...previousElements,
            {
                id: Date.now(),
                type,
                name,
                text,
                table,
                editor,
                settings,
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            }
        ]);
    };

    const handleElementClick = (event, id) => {
        event.stopPropagation();
        if (event.ctrlKey || event.metaKey) {
            const newSelectedElements = new Set(selectedElements);
            if (newSelectedElements.has(id)) {
                newSelectedElements.delete(id);
            } else {
                newSelectedElements.add(id);
            }
            setSelectedElements(newSelectedElements);
        } else if (!selectedElements.has(id) || selectedElements.size > 1) {
            setSelectedElements(new Set([id]));
        }
    };

    return (
        <div className={style.main}>
            <div className={style.startline}>
                <div className={style.title_left_right}>
                    <div className={style.btn_tit_left}>
                        <img src="/components/buttons/tit_left.svg" alt=""/>
                    </div>
                    <div className={style.btn_tit_right}>
                        <img src="/components/buttons/tit_right.svg" alt=""/>
                    </div>
                </div>
                <input type="text" placeholder="Название новой страницы"/>
            </div>

            <div
                ref={workplaceRef}
                className={`${style.workplace} ${blocks === 0 ? style.activity : ''} ${net ? style.net : ''}`}
                style={boxes.length && boxes[0].pos === 1 ? { flexDirection: 'row' } : {}}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
            >
                {isSelecting && selectionBox && (
                    <div
                        style={{
                            position: 'absolute',
                            left: `${Math.min(selectionBox.startX, selectionBox.endX)}px`,
                            top: `${Math.min(selectionBox.startY, selectionBox.endY)}px`,
                            width: `${Math.abs(selectionBox.endX - selectionBox.startX)}px`,
                            height: `${Math.abs(selectionBox.endY - selectionBox.startY)}px`,
                            backgroundColor: 'rgba(110, 3, 123, 0.2)',
                            border: '1px dashed #6e037b',
                            pointerEvents: 'none',
                            zIndex: 8
                        }}
                    />
                )}

                {elements.map((element, index) => (
                    <div
                        key={element.id}
                        ref={elementNode => elementsRef.current[index] = elementNode}
                        style={{
                            position: 'absolute',
                            left: `${element.x}px`,
                            top: `${element.y}px`,
                            zIndex: 10,
                            cursor: 'move',
                            boxShadow: selectedElements.has(element.id)
                                ? '0 2px 8px rgba(0,0,0,0.5)'
                                : '0 2px 4px rgba(0,0,0,0.0)',
                            transition: 'box-shadow 0.2s ease'
                        }}
                        onMouseDown={(event) => handleElementMouseDown(event, element.id)}
                        onClick={(event) => {handleElementClick(event, element.id); openEditWin(element, element.id, true)}}
                        onDoubleClick={(event) => handleDoubleClick(event, element)}
                    >
                        {element.type === 'button' ? (
                            editingElementId === element.id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onKeyDown={(e) => handleTextSave(e, element.id)}
                                    onBlur={(e) => handleTextSave(e, element.id)}
                                    autoFocus
                                    style={{
                                        border: '1px solid #6e037b',
                                        padding: '5px',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        outline: 'none'
                                    }}
                                />
                            ) : (
                                <BTNs btnName={element.name} btnText={element.text}/>
                            )
                        ) : (
                            <Frames frameName={element.name} tables={element.table}/>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewLayer;