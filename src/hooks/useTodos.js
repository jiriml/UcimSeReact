import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "@context/TodosContext";

const useTodos = ({getShared}) => {
    const [todosdata, setTodosdata] = useState({"todos":[],"validVars":[],"selectedIndex":-1});
    /*
    |--todos
    |  +--*jednotlivé řádky [název, status, pole popisů]
    |
    |--validVars
    |  +--*stringy validních popisů
    |
    |--selectedIndex
    |  +-- číslo indexu int
    */

    // redux? Co to je?
    const validateRow = (row) => {
        let validated = [String(row[0]),String(row[1]), [...row[2],...Array(todosdata["validVars"].length).fill("")].slice(0,todosdata["validVars"].length)]
        return validated;
    }

    const unityVars = (vars) => {
        let newVars = Array(todosdata["validVars"].length).fill("");
        for (let key of Object.keys(vars)) {
            if (todosdata["validVars"].indexOf(key)>-1) {
                newVars[todosdata["validVars"].indexOf(key)] = vars[key]
            }
        }
        return newVars;
    }


    const setTodoVar = (index, key, value) => {
        setTodosdata(prev=>{
            let copied = JSON.parse(JSON.stringify(prev));
            if (key.startsWith("vv$")) {
                try {copied["todos"][index][2][parseInt(key.slice(3))]=value}catch(e){}
            } else if (key=="name") {
                try{copied["todos"][index][0]=value}catch(e){}
            } else if (key=="status") {
                try{copied["todos"][index][1]=value}catch(e){}
            }
            return copied;
        })
    }

    const getTodos = () => {
        return todosdata["todos"];
    }

    const addValidVar = (name) => {
        setTodosdata(prev=>{
            let copied = JSON.parse(JSON.stringify(prev));
            copied["validVars"] = [...copied["validVars"],name];
            return copied;
        });
        validateAll();
    }
    const deleteValidVar = (index) => {
        setTodosdata(prev=>{
            let copied = JSON.parse(JSON.stringify(prev));
            let findex = index<0? Infinity : Math.ceil(index);
            copied["validVars"] = [...copied["validVars"].slice(0,findex),...copied["validVars"].slice(findex+1)];
            return copied;
        })
    }

    const deleteTodo = (index) => {
        setTodosdata(prev=>{
            
            let copied = JSON.parse(JSON.stringify(prev));
            let findex = index<0? Infinity : Math.ceil(index);
            copied["todos"] = [...copied["todos"].slice(0,findex),...copied["todos"].slice(findex+1)];
            return copied;
        })
    }

    const switchSelect = (index) => {
        setTodosdata(prev=>{
            let copied = JSON.parse(JSON.stringify(prev));
            if (index==copied["selectedIndex"]) {
                copied["selectedIndex"] = -1;
            } else {
                copied["selectedIndex"] = index;
            }
            return copied;
        })
    }
    const getSelected = () => {
        return todosdata["selectedIndex"];
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

    return { validateRow, getTodos, addTodo, getValidVars, validateAll, unityVars, deleteTodo, addValidVar, deleteValidVar, setTodoVar, getSelected, switchSelect }
}
export default useTodos;