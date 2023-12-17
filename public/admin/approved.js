var table2 = document.getElementById('table2')



const getAllEwastes = () => {

    fetch('/api/v1/allusers')
        .then(res => res.json())
        .then((res) => {
            var n = res.users.length
            let { users } = res
            li = ""
            console.log("ewastes", users.ewaste)
            for (i = 0; i < n; i++) {
                var m = users[i].ewaste.length
                for (j = 0; j < m; j++) {
                    console.log(users[i].ewaste[j])
                    if (users[i].ewaste[j].approved && !users[i].ewaste[j].rejected) {
                        li = li + `<tr>
            <th scope="row">${users[i].ewaste[j]._id}</th>
            <td>${users[i].ewaste[j].name}</td>
            <td>${users[i].ewaste[j].location}</td>
            <td><img class=' w-50 image'  src='${users[i].ewaste[j].photo}'/>
            </td>
            <td>
                <p>Approved</p>
            </td>
            </tr>`
                    }
                }
            }
            table2.innerHTML = li

        })
        .catch((err) => console.log(err))
}

getAllEwastes()
