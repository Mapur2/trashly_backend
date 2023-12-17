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
                    if (!users[i].ewaste[j].approved && !users[i].ewaste[j].rejected) {
                        li = li + `<tr>
            <th scope="row">${users[i].ewaste[j]._id}</th>
            <td>${users[i].ewaste[j].name}</td>
            <td>${users[i].ewaste[j].location}</td>
            <td><img class=' w-50 image'  src='${users[i].ewaste[j].photo}'/>
            </td>
            <td>
            <button id=${users[i].ewaste[j]._id} class='btn btn-primary'>Approve</button> 
            </td>
            <td>
            <p class='btn btn-danger' id=${users[i].ewaste[j]._id} >Reject</p> 
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

table2.addEventListener("click", (e) => {
    if (e.target.matches('button')) {
        console.log("clicked", e.target.id)
        const ewasteId = e.target.id
        const content = {
            ewasteId,
            isApproved: true
        }
        console.log(JSON.stringify(content))
        fetch("/api/v1/approve",
            {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(content)
            })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
})

table2.addEventListener("click", (e) => {
    if (e.target.matches('p')) {
        console.log("clicked", e.target.id)
        const ewasteId = e.target.id
        const content = {
            ewasteId,
            isRejected: true
        }
        console.log(JSON.stringify(content))
        fetch("/api/v1/reject",
            {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(content)
            })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
})