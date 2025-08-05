import React, { useState } from "react";


function Task({ index, selected, text, done, sendInfoUp }) {
    if (!selected) { // Standardní nevybraný task
        return <tr className="unselectedTask">
            <td>{done==1? (<span style={{opacity:"50%"}}>{text}   </span>):(<span>{text}   </span>)}</td>
            <td><button onClick={()=>sendInfoUp(index,"delete")}>Smazat</button></td>
            <td><input type="range" min={1} max={3} value={1+done*2} onChange={(event)=>{sendInfoUp(index,"switchdone",[event.target.value])}}></input></td>
            <td><button onClick={()=>sendInfoUp(index,"switchselect")}>Vybrat</button></td>
        </tr>
    } else { // Vybraný task
        return <tr className="selectedTask">
            <td>{done==1? (<span style={{opacity:"50%"}}>{text}   </span>):(<span>{text}   </span>)}</td>
            <td><button onClick={()=>sendInfoUp(index,"delete")}>Smazat</button></td>
            <td><input type="range" min={1} max={3} value={1+done*2} onChange={(event)=>sendInfoUp(index,"switchdone",[event.target.value])}></input></td>
            <td><button onClick={()=>sendInfoUp(index,"switchselect")}>Zrušit vybrání</button></td>
        </tr> 
    }
}


function ToDoList() {

    // Pole tasku bude ve formátu [text:str, selected:bool, done:float]

    const [data,setData] = useState({"text":"Nevybráno","index":-1,"tasks": []})

    function recieveInfo(index,msg,extradata=[]) {
        setData( prev => {
            let tasksCopy = JSON.parse(JSON.stringify([...prev["tasks"]]))
            let newIndex = prev["index"]
            let newText = prev["text"]
            if (msg=="delete") {
                if (prev["index"]==index) {
                    newIndex = -1;
                    newText = "Nevybráno";
                }
                else if (prev["index"]>=index) {
                    newIndex = prev["index"] - 1;
                }
                tasksCopy.splice(index,1);
            } else if (msg=="switchdone") {
                tasksCopy[index][2] = (extradata[0]-1)/2;
            } else if (msg=="switchselect") {
                tasksCopy[index][1] = 1; 
                if (prev["index"]!=-1) {tasksCopy[prev["index"]][1] = 0}
                (prev["index"] == index) ? (newIndex=-1) : (newIndex=index) // (Klikl jsem už na vybraný Task? ) ANO: Tak zruš jeh vybrání, NE: Vyber ho
                newText = (newIndex==-1) ? "Nevybráno" : tasksCopy[newIndex][0]
                
            } else {
                return prev // Něco je špatně, skončím a nebudu nastavovat
            }
            return {"text":newText,"index":newIndex,"tasks":tasksCopy}
        })
    }
    function addNewTask() {
        setData(prev=>{return {"text":prev["text"],"index":prev["index"],"tasks":[...prev["tasks"], ["Nový úkol", 0, 0]]}});
        recieveInfo(data["tasks"].length,"switchselect");
    }

    function onChangeText(event) {
        setData(prev=>{

            let newdata = JSON.parse(JSON.stringify(prev));
            if (prev["index"]==-1) {
                newdata["text"] = "Nevybráno"
            } else {
                newdata["text"] = event.target.value;
                newdata["tasks"][prev["index"]][0] = event.target.value
            }
            return newdata;
        })
                
    }

    return (<>
        <h1>Test ToDo aplikace</h1>
        <input placeholder="Jméno tasku" value={data["text"]} onChange={onChangeText}></input><button onClick={()=>addNewTask()}>➕</button>
        <div style={{width:"100%",justifyContent:"center",display:"flex"}}><table>
            <tbody><tr><td>Název</td><td>Smazat 🔽</td><td>Přidáno - Rozděláno - Doděláno</td><td>Vybrat 🔽</td></tr>
            {data["tasks"].map((task,index) => 
                <Task key={index} index={index} selected={task[1]} done={task[2]} text={task[0]} sendInfoUp={(...args)=>{recieveInfo(...args)}}></Task>

            )}</tbody>
        </table></div>
    
    
    </>)

}



export default ToDoList