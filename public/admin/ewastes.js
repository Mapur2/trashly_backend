var table2 = document.getElementById('table2')



const getAllEwastes = () => {

    fetch('/api/v1/userswaste')
        .then(res => res.json())
        .then((res) => {

            let { users } = res
            li = ""
            var n = users.length
            for (i = 0; i < n; i++) {
                ewastes=users[i].ewaste
                var m = ewastes.length
                for (j = 0; j < m; j++) 
                {
                    
                    if (!ewastes[j].approved && !ewastes[j].rejected) {
                        li = li + `<tr>
            <th scope="row">${users[i].name}<br/>${users[i].number}<br/>${users[i].email}<br/>
            ${users[i]._id}</th>
            <td>${ewastes[j].name}</td>
            <td>${ewastes[j].location}</td>
            <td><img class=' w-50 image'  src='${ewastes[j].photo}'/>
            </td>
            <td>
            <button id=${ewastes[j]._id} class='btn btn-primary'>Approve</button> 
            </td>
            <td>
            <p class='btn btn-danger' id=${ewastes[j]._id} >Reject</p> 
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