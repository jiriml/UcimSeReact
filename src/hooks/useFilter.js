
const useFilter = ({getShared}) => {
    const fixFilter = (oldData) => {
        let shared = getShared();
        let oldFilter = JSON.parse(JSON.stringify(oldData["filter"]));
        let newFilter = {"status":[false,[],[]],"customs":oldData["validVars"].map(v=>[false,[],[]])}

        if (oldFilter["status"][0]) { //status se řadil
            newFilter["status"][0]=true;
            let allowed = {0:true,0.5:true,1:true}
            for (let pair of Object.values(oldFilter["status"][1])) {
                if (Object.keys(allowed).includes(pair[0]) && allowed[pair[0]] && pair[1]) {
                    allowed[pair[0]] = false;
                    newFilter["status"][1].push(pair[0]);
                }
            }
            for (let key of Object.keys(allowed)) {
                if (allowed[key]) {
                    newFilter["status"][2].push(key);
                }
            }
        }
        for (let index=0;index<oldFilter["customs"].length;index++) { if (oldFilter["customs"][index][0])  {
                let allowed = {}
                for (let record of Object.values("todos")) {
                    allowed[record[2][index]] = true;
                }
                for (let pair of Object.values(oldFilter["customs"][index][1])) {
                    if (Object.keys(allowed).includes(pair[0]) && allowed[pair[0]]) {
                        allowed[pair[0]] = false;
                        newFilter["customs"][index][1].push(pair[0]);
                    }
                }
                for (let key of Object.keys(allowed)) {
                    if (allowed[key]) {
                        newFilter["customs"][index][2].push(key);
                    }
                }
        }}
        return newFilter;

    }
    const getForUi = () => {
        const filter = fixFilter(getShared().useTodos.getAllData());
        const allData = getShared().useTodos.getAllData();
        let result = [] // Bude obsahovat pole o čtyřech prvcích: Nadpis, filtrováno, zaškrtlé a nezaškrtlé
        if (filter["status"][0]) {
            let subresult = ["status",true,[],[]]
            subresult[2]=filter["status"][1]
            subresult[3]=filter["status"][2]
            subresult[2].sort()
            subresult[3].sort()
            result.push(subresult);
        } else { result.push(["status",false,[],[]])}
        for (let index=0;index<filter["customs"].length;index++) {
            if (filter["customs"][index][0]) {
                let subresult = [allData["validVars"][index],filter["customs"][index][0],filter["customs"][index][1],filter["customs"][index][2]]
                subresult[2].sort();
                subresult[3].sort();
                result.push(subresult);
            } else {
                let subresult = [allData["validVars"][index],filter["customs"][index][0],[],[]]
                subresult[2].sort();
                subresult[3].sort();
                result.push(subresult);

            }
            

        }
        return result;

    }



    const toogleFilter = (k,v) => {
        let shared = getShared()
        let dat = shared.useTodos.getAllData()
        if (k<0) {
            dat["filter"]["status"][0] = v;
        } else {
            dat["filter"]["customs"][k][0] = v;
        }
        shared.useTodos.setFilter(fixFilter(dat));
    }
    const recieveAction = (t,value) => {

    }

    return {toogleFilter ,recieveAction,getForUi,fixFilter};

}

export default useFilter;