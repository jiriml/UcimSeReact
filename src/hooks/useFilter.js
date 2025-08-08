
const useFilter = ({getShared}) => {
    const fixFilter = (oldData) => {
        let shared = getShared();
        let oldFilter = JSON.parse(JSON.stringify(oldData["filter"]));
        let newFilter = {"status":[false,[],[]],"customs":oldData["validVars"].map(v=>[false,[],[]])}

        if (oldFilter["status"][0]) { //status se řadil
            newFilter["status"][0]=true;
            let allowed = {"0":true,"0.5":true,"1":true}
            for (let thing of Object.values(oldFilter["status"][1])) {
                if (Object.keys(allowed).includes(thing) && allowed[thing]) {
                    allowed[thing] = false;
                    newFilter["status"][1].push(thing);
                }
            }
            for (let key of Object.keys(allowed)) {
                if (allowed[key]) {
                    newFilter["status"][2].push(key);
                }
            }
        }
        for (let index=0;index<oldFilter["customs"].length;index++) { if (oldFilter["customs"][index][0])  {
            newFilter["customs"][index][0] = true;
            let allowed = {}
            for (let record of Object.values(oldData["todos"])) {
                allowed[record[2][index]] = true;
            }
            for (let thing of Object.values(oldFilter["customs"][index][1])) {
                if (Object.keys(allowed).includes(thing) && allowed[thing]) {
                    allowed[thing] = false;
                    newFilter["customs"][index][1].push(thing);
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
        let shared = getShared();
        let dat = shared.useTodos.getAllData();
        if (k<0) {
            dat["filter"]["status"][0] = v;
        } else {
            dat["filter"]["customs"][k][0] = v;
        }
        shared.useTodos.setFilter(fixFilter(dat));
    }
    const recieveAction = (k1,k2,value) => {
        let shared = getShared();
        let dat = shared.useTodos.getAllData();
        if (k1<0) {
            if (dat["filter"]["status"][1].indexOf(k2)>-1) {
                value?null:dat["filter"]["status"][1].splice(dat["filter"]["status"][1].indexOf(k2),1);
            } else if (value) {dat["filter"]["status"][1].push(k2)}
            if (dat["filter"]["status"][2].indexOf(k2)>-1) {
                value?dat["filter"]["status"][2].splice(dat["filter"]["status"][2].indexOf(k2),1):null;
            } else if (!value) {dat["filter"]["status"][2].push(k2)}
        } else {
            if (dat["filter"]["customs"][k1][1].indexOf(k2)>-1) {
                value?null:dat["filter"]["customs"][k1][1].splice(dat["filter"]["customs"][k1][1].indexOf(k2),1);
            } else if (value) {dat["filter"]["customs"][k1][1].push(k2)}
            if (dat["filter"]["customs"][k1][2].indexOf(k2)>-1) {
                value?dat["filter"]["customs"][k1][2].splice(dat["filter"]["customs"][k1][2].indexOf(k2),1):null;
            } else if (!value) {dat["filter"]["customs"][k1][2].push(k2)}
        }
        shared.useTodos.setFilter(fixFilter(dat));
    }
    return {toogleFilter ,recieveAction,getForUi,fixFilter};

}

export default useFilter;