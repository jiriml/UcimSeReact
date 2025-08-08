import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "@context/TodosContext";

const useTodos = ({getShared}) => {
    const [todosdata, setTodosdata] = useState({"todos":[],"validVars":[],"selectedIndex":-1,"filter":{"status":[false,[],[]],"customs":[]}});
    /*
    |--todos
    |  +--*jednotlivé řádky [název, status, pole popisů]
    |
    |--validVars
    |  +--*stringy validních popisů
    |
    |--selectedIndex
    |  +-- číslo indexu int
    |
    |--Filter
    |  |-- ["status"]
    |  |   |-- [0] Filtrovat Ano/Ne
    |  |   +--[1]
    |  |   |   +-- *[povolené hodnoty]
    |  |   +--[2]
    |  |       +-- *[nepovolené hodnoty]
    |  +--[ "customs" ]
    |      |
    |      |--- *[index podle validVars] název
                |-- [0] Filtrovat Ano/Ne
                |-- [1] Povolené hodnoty
                |-- [2] Nepovolené hodnoty
               

    */

    const validateRow = (row,reqlen=-1) => {
        let l = (reqlen>0)? reqlen: todosdata["validVars"].length;
        let validated = [String(row[0]),String(row[1]), [...row[2],...Array(l).fill("")].slice(0,l)]
        return validated;
    }

    const unityVars = (vars) => {
        let newVars = Array(todosdata["validVars"].length).fill("");
       for (let key of Object.keys(vars)) {
            if (parseInt(key)>-1) {
                newVars[parseInt(key)] = vars[parseInt(key)]
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
            copied["filter"] = getShared().useFilter.fixFilter(copied); //Oprava filtrus
            return copied;
        })
    }

    const getTodos = () => {
        let result = []
        result = todosdata["todos"].filter((v)=>{
            if (todosdata["filter"]["status"][0]) {
                if (!(todosdata["filter"]["status"][1].includes(String(v[1])))) {return false}
            }
            for (let filindex=0;filindex<todosdata["validVars"].length;filindex++) {
                if (todosdata["filter"]["customs"][filindex][0]) {
                    if (!(todosdata["filter"]["customs"][filindex][1].includes(v[2][filindex]))) {return false}
                }
            }
            
            return true;
        })
        console.log(result);
        return result;
    }

    const addValidVar = (name) => {
        setTodosdata(prev=>{
            let copied = JSON.parse(JSON.stringify(prev));
            copied["validVars"] = [...copied["validVars"],name];
            copied["filter"] = getShared().useFilter.fixFilter(copied); //Oprava filtru
            return copied;
        });
        validateAll();
    }
    const deleteValidVar = (index) => {
        setTodosdata(prev=>{
            let copied = JSON.parse(JSON.stringify(prev));
            let findex = index<0? Infinity : Math.ceil(index);
            copied["validVars"] = [...copied["validVars"].slice(0,findex),...copied["validVars"].slice(findex+1)];
            for (let i=0;i<copied["todos"].length;i++) {
                copied["todos"][i][2] = [...copied["todos"][i][2].slice(0,findex),...copied["todos"][i][2].slice(findex+1)]
                copied["filter"]["customs"] = [...copied["filter"]["customs"].slice(0,findex),...copied["filter"]["customs"].slice(findex+1)]
            }
            return copied;
        })
    }

    const deleteTodo = (index) => {
        setTodosdata(prev=>{
            
            let copied = JSON.parse(JSON.stringify(prev));
            if (copied["selecetedIndex"]==index){
                copied["selectedIndex"]=-1;
            } else if (copied["selectedIndex"]>index) {
                copied["selectedIndex"] = copied["selectedIndex"] -1;
            }
            let findex = index<0? Infinity : Math.ceil(index);
            copied["todos"] = [...copied["todos"].slice(0,findex),...copied["todos"].slice(findex+1)];
            copied["filter"] = getShared().useFilter.fixFilter(copied); //Oprava filtru
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
            validated["filter"] = getShared().useFilter.fixFilter(validated); //Oprava filtru
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
                validated["todos"][index] = validateRow(validated["todos"][index],prev["validVars"].length);
            }
            return validated;
        })
    }
    const getAllData = () => {
        return JSON.parse(JSON.stringify(todosdata));
    }
    const setFilter = (dat) => {
        setTodosdata(prev=>{
            let result = JSON.parse(JSON.stringify(prev));
            result["filter"] = dat;
            return result;
        })
    }

    return { setFilter, validateRow, getTodos, addTodo, getValidVars, validateAll, unityVars, deleteTodo, addValidVar, deleteValidVar, setTodoVar, getSelected, switchSelect, getAllData }
}
export default useTodos;