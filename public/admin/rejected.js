var table2 = document.getElementById('table2')



const getAllEwastes = () => {

    fetch('/api/v1/ewastes')
        .then(res => res.json())
        .then((res) => {
            let { ewastes } = res
            li = ""
            console.log("ewastes", ewastes)
            var m = ewastes.length
            for (j = 0; j < m; j++) {
                console.log(ewastes[j])
                if (!ewastes[j].approved && ewastes[j].rejected) {
                    li = li + `<tr>
            <th scope="row">${ewastes[j]._id}</th>
            <td>${ewastes[j].name}</td>
            <td>${ewastes[j].location}</td>
            <td><img class=' w-50 image'  src='${ewastes[j].photo}'/>
            </td>
            <td>
                <p>Rejected</p>
            </td>
            </tr>`

                }
            }
            table2.innerHTML = li

        })
        .catch((err) => console.log(err))
}

getAllEwastes()
