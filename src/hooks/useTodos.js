import { useState } from "react";

const useTodos = () => {
    const [todosdata, setTodosdata] = useState({"todos":[],"validVars":[]});
    /*
    |--todos
    |  +--*jednotlivé řádky [název, status, pole popisů]
    |
    |--validVars
    |  +--*stringy validních popisů
    |
    */

    // redux? Co to je?
    const validateRow = (row) => {
        let validated = [String(row[0]),String(row[1]), (()=>{let res = {};for (let thing of todosdata["validVars"]){res[thing]=""}return res})() ]
        for (let key of Object.keys(row[2])) {
            if (key in Object.keys(validated[2])) {
                validated[2][key] = row[2][key]
            }
        }
        return validated;
    }


    const getTodos = () => {
        return todosdata["todos"];
    }
    const addTodo = (row) => {
        setTodosdata(prev=>{
            let validated = JSON.parse(JSON.stringify(prev));
            validated["todos"] = [...validated["todos"],validateRow(row)];
            return validated;
        })
    }
    const getValidVars = () => {
        return todosdata["validVars"];
    }
    const validateAll = () => {
        setTodosdata(prev=>{
            let validated = JSON.parse(JSON.stringify(prev));
            for (let index = 0;index<validated["todos"]; index++) {
                validated["todos"][index] = validateRow(validated["todos"][index]);
            }
            return validated;
        })
    }
}
export default useTodos;