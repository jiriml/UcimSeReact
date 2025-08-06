import { TodosContext } from "@context/TodosContext";
import { useContext } from "react";


const TodoList = () => {
    const shared = useContext(TodosContext);
    const Task = shared.TodoItem;
    const recieveInfo = () => {}
    return (<>
        <h1>Test ToDo aplikace</h1>
        <div style={{width:"100%",justifyContent:"center",display:"flex"}}><table>
            <tbody><tr><td>Název</td><td>Smazat 🔽</td><td>Přidáno - Rozděláno - Doděláno</td><td>Vybrat 🔽</td></tr>
            {shared.useTodos.getTodos().map((task,index) => 
                <Task key={index} index={index} status={task[1]} text={task[0]} sendInfoUp={(...args)=>{recieveInfo(...args)}}></Task>

            )}</tbody>
        </table></div>
    
    
    </>)

}

export default TodoList;