import { useState } from "react";

const DraggableDiv = () => {
    const [coordinate, setCoordinate] = useState({
        x: 0,
        y: 0,
        dragging: false,
        styles: {}
    })

    const dragStart = (e:any) => {
        setCoordinate({
            ...coordinate,
            x: e.screenX - e.currentTarget.getBoundingClientRect().left,
            y: e.screenY - e.currentTarget.getBoundingClientRect().top,
            dragging: true,
        })
    }

    const dragging = (e:any) => {
        if(coordinate.dragging){
            let left = e.screenX - coordinate.x;
            let top = e.screenY - coordinate.y;
    
            setCoordinate({
                ...coordinate,
                styles: {
                    left,
                    top
                }
            })
        }
    }

    const dragEnd = () => {
        setCoordinate({
            ...coordinate,
            dragging: false,
        })
    }

    return (
        <div
            style={{
                background: 'blue',
                borderRadius: '50px',
                color: 'white',
                padding: '2px 5px',
                display: 'inline-block',
                cursor: 'pointer',
                position: 'absolute',
                ...coordinate.styles
            }} 
            onMouseDown={dragStart}
            onMouseMove={dragging}
            onMouseUp={dragEnd}
            onMouseLeave={dragEnd}
        >
            Move me around
        </div>
    )
}

export default DraggableDiv;