import React from "react";
import { useForm } from "react-hook-form";
import { TodosContext } from "@context/TodosContext";
import { useContext } from "react";
import { redirect } from "react-router-dom";

const FilterDom = ({}) => {
        const shared = useContext(TodosContext);
        return ( <>
        <h1>Filtr</h1>
        <div style={{width:"100%",justifyContent:"center",display:"flex"}}><table>
            <tbody>
                <tr>
                    {shared.useFilter.getForUi().map((p,key)=>
                    <td key={key}>
                        <h3>{p[0]}</h3>
                        Filtrovat: {p[1]?<input type="checkbox" onChange={(event)=>{shared.useFilter.toogleFilter(key-1,event.target.checked)}} checked/>:<input type="checkbox" onChange={(event)=>{shared.useFilter.toogleFilter(key-1,event.target.checked)}} />}
                    </td>
                    
                    )}
                </tr>
            </tbody>
        </table></div>
    
    </>)



}

export default FilterDom;