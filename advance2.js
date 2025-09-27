let url = "http://universities.hipolabs.com/search?country=India"; 
let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let state = document.querySelector("input").value.trim();
    console.log("Searching for:", state);

    let colArr = await getColleges(state);
    show(colArr);
});

function show(colArr) {
    let list = document.querySelector("#list");
    list.innerText = "";

    if (colArr.length === 0) {
        let li = document.createElement("li");
        li.innerText = "No universities found for this state.";
        list.appendChild(li);
        return;
    }

    for (let col of colArr) {
        let li = document.createElement("li");
        li.innerText = col.name + (col["state-province"] ? `(${col["state-province"]}) `: "");
        list.appendChild(li);
    }
}

async function getColleges(state) {
    try {
        let res = await axios.get(url);
      //   Filter universities manually by state
        let filtered = res.data.filter(col => 
            col["state-province"] && 
            col["state-province"].toLowerCase().includes(state.toLowerCase())
        );
        return filtered;
    } catch (err) {
        console.log("error:", err);
        return [];
    }
}
