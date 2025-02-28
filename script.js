fetch("Table_Input.csv")
    .then(response => response.text())
    .then(csvText => {
        Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,  
            transform: (value) => value?.toString().trim() ?? "",  
            complete: function (result) {
                console.log(result.data); 
                displayTable1(result.data);
                displayTable2(result.data);
            }
        });
    });

// Display Table 1
function displayTable1(data) {
    let table = document.getElementById("table1");
    let headerRow = "<tr>" + Object.keys(data[0]).map(col => `<th>${col}</th>`).join("") + "</tr>";
    let rows = data.map(row => "<tr>" + Object.values(row).map(val => `<td>${val ?? "N/A"}</td>`).join("") + "</tr>").join(""); 
    table.innerHTML = headerRow + rows;
}

// Display Table 2
function displayTable2(data) {
    let table2 = document.querySelector("#table2 tbody");
    table2.innerHTML = ""; 

    let a5 = data[4]?.["Value"] ?? 0;
    let a20 = data[19]?.["Value"] ?? 0;
    let a15 = data[14]?.["Value"] ?? 0;
    let a7 = data[6]?.["Value"] ?? 0; 
    let a13 = data[12]?.["Value"] ?? 0;
    let a12 = data[11]?.["Value"] ?? 0;

    let table2Data = [
        ["Alpha", a5 + a20],
        ["Beta", a7 !== 0 ? Math.floor(a15 / a7) : "N/A"],  
        ["Charlie", a13 * a12]
    ];

    table2Data.forEach(row => {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${row[0]}</td><td>${row[1]}</td>`;
        table2.appendChild(tr);
    });
}
