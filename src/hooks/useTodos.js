import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "@context/TodosContext";

const useTodos = ({getShared}) => {
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
            if (Object.keys(validated[2]).includes(key)) {
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
            for (let index = 0;index<validated["todos"].length; index++) {
                validated["todos"][index] = validateRow(validated["todos"][index]);
            }
            return validated;
        })
    }

    return { validateRow, getTodos, addTodo, getValidVars, validateAll }
}
export default useTodos;