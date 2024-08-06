import { useRef, useEffect, useState } from "react";
import { setNewOffset, autoGrow, setZIndex } from '../utils.js';
import Trash from "../assets/icons/Trash.jsx";

const NoteCard = ({ note }) => {
    // Załóżmy, że note.position, note.colors i note.body są już obiektami
    const [position, setPosition] = useState(note.position || { x: 0, y: 0 });
    const colors = note.colors || {};
    const body = note.body || "";

    let mouseStartPos = { x: 0, y: 0 };

    const cardRef = useRef(null);
    const textAreaRef = useRef(null);

    useEffect(() => {
        autoGrow(textAreaRef);
    }, []);

    const mouseDown = (e) => {
        setZIndex(cardRef.current);
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    };

    const mouseMove = (e) => {
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };

        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
        setPosition(newPosition);
    };

    return (
        <div
            ref={cardRef}
            className='card'
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        >
            <div
                onMouseDown={mouseDown}
                className="card-header"
                style={{ backgroundColor: colors.colorHeader }}
            >
                <Trash />
            </div>

            <div className="card-body">
                <textarea
                    ref={textAreaRef}
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                    onInput={() => {
                        autoGrow(textAreaRef);
                    }}
                    onFocus={() => {
                        setZIndex(cardRef.current);
                    }}
                ></textarea>
            </div>
        </div>
    )
}

export default NoteCard;
