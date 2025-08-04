import React, { useState } from "react";


function Task({ index, selected, text, done, sendInfoUp }) {
    if (!selected) { // Standardní nevybraný task
        return <li>
            <p>{text}</p>
            <button onClick={()=>sendInfoUp(index,"delete")}>Smazat</button>
            {{done} && <button onClick={()=>sendInfoUp(index,"switchdone")}>Dokončit</button>}
            {(!{done}) && <button onClick={()=>sendInfoUp(index,"switchdone")}>Zrušit dokončení</button>}
            <button onClick={()=>sendInfoUp(index,"switchselect")}>Vybrat</button>
        </li>
    } else { // Vybraný task
        return <li>
            <p>{text}</p>
            <button onClick={()=>sendInfoUp(index,"delete")}>Smazat</button>
            {{done} && <button onClick={()=>sendInfoUp(index,"switchdone")}>Dokončit</button>}
            {(!{done}) && <button onClick={()=>sendInfoUp(index,"switchdone")}>Zrušit dokončení</button>}
            <button onClick={()=>sendInfoUp(index,"switchselect")}>Zrušit vybrání</button>
        </li> 
    }
}


function ToDoList() {

    // Pole tasku bude ve formátu [text:str, selected:bool, done:bool]

    const [data,setData] = useState({"text":"","index":-1,"tasks": []})

    function recieveInfo(index,msg) {
        setData( prev => {
            let tasksCopy = [...prev["tasks"]]
            let newIndex = prev["index"]
            let newText = prev["text"]
            if (msg=="delete") {
                if (prev["index"]==index) {
                    newIndex = -1;
                }
                else if (prev["index"]>=index) {
                    newIndex = prev["index"] -= 1;
                }
                tasksCopy.splice(index,1);
            } else if (msg=="switchdone") {
                tasksCopy[index][2] ^= 1;
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
 


        setData(prev=>{console.log(prev);return {"text":prev["text"],"index":prev["index"],"tasks":[...prev["tasks"], ["Nový úkol", 0, 0]]}});

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
        <ol>
            {data["tasks"].map((task,index) => 
                <div>
                    asasas
                    <Task index={index} selected={task[1]} done={task[2]} text={task[0]} sendInfoUp={(...args)=>{recieveInfo(...args)}}></Task>
                </div>
            )}
        </ol>
    
    
    </>)

}



export default ToDoList