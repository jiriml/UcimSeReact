const TodoItem = ({ index, text, status, sendInfoUp }) => {
    /*if (!selected) { // Standardní nevybraný task*/
        return <tr className="unselectedTask">
            <td>{status==1? (<span style={{opacity:"50%"}}>{text}   </span>):(<span>{text}   </span>)}</td>
            <td><button onClick={()=>sendInfoUp(index,"delete")}>Smazat</button></td>
            <td><input type="range" min={1} max={3} value={1+status*2} onChange={(event)=>{sendInfoUp(index,"switchdone",[event.target.value])}}></input></td>
            <td><button onClick={()=>sendInfoUp(index,"switchselect")}>Vybrat</button></td>
        </tr>
    /*} else { // Vybraný task
        return <tr className="selectedTask">
            <td>{done==1? (<span style={{opacity:"50%"}}>{text}   </span>):(<span>{text}   </span>)}</td>
            <td><button onClick={()=>sendInfoUp(index,"delete")}>Smazat</button></td>
            <td><input type="range" min={1} max={3} value={1+done*2} onChange={(event)=>sendInfoUp(index,"switchdone",[event.target.value])}></input></td>
            <td><button onClick={()=>sendInfoUp(index,"switchselect")}>Zrušit vybrání</button></td>
        </tr> 
    }*/
}

export default TodoItem;