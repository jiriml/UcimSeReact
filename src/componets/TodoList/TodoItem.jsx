import { TodosContext } from "@context/TodosContext";
import { useContext } from "react";

const TodoItem = ({ index, text, status, sendInfoUp, vars }) => {
    const shared = useContext(TodosContext);
    const selected = shared.useTodos.getSelected();


    if (!(index==selected)) { // Standardní nevybraný task*/
        return <tr className="unselectedTask">
            <td>{status==1? (<span style={{opacity:"50%"}}>{text}   </span>):(<span>{text}   </span>)}</td>
            <td><button onClick={()=>shared.useTodos.deleteTodo(index)}>🗑</button></td>
            <td><button onClick={()=>shared.useTodos.switchSelect(index)}>✏️</button></td>
            <td><input type="range" min={1} max={3} value={1+status*2} onChange={(event)=>{shared.useTodos.setTodoVar(index,"status",([event.target.value]-1)/2)}}></input></td>
            
            <td>{" | "}</td>
            {vars.map((validVar,index)=>
                <td key={index}>{validVar}</td>
            )}
        </tr>
    } else { // Vybraný task
        return <tr className="unselectedTask">
            <td>{status==1? (<span contentEditable="true" style={{opacity:"50%"}} onChange={(event)=>{shared.useTodos.setTodoVar(index,"name",([event.target.value]-1)/2)}} suppressContentEditableWarning>{text}   </span>):(<span contentEditable="true" onChange={(event)=>{shared.useTodos.setTodoVar(index,"name",([event.target.value]-1)/2)}} suppressContentEditableWarning>{text}   </span>)}</td>
            <td><button onClick={()=>shared.useTodos.deleteTodo(index)}>🗑</button></td>
            <td><button onClick={()=>shared.useTodos.switchSelect(index)}>❌✏️</button></td>
            <td><input type="range" min={1} max={3} value={1+status*2} onChange={(event)=>{shared.useTodos.setTodoVar(index,"status",([event.target.value]-1)/2)}}></input></td>
            <td>{" | "}</td>
            {vars.map((validVar,index2)=>
                <td suppressContentEditableWarning contentEditable="true" onChange={(event)=>{shared.useTodos.setTodoVar(index,"vv$"+String(index2),event.target.value)}} key={index2}>{validVar}</td>
            )}
        </tr>
    }
}

export default TodoItem;