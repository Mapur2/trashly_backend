var table1 = document.getElementById('table1')

const getAll = () => {

    fetch('/api/v1/allusers')
        .then(res => res.json())
        .then((res) => {
            var n = res.users.length
            let { users } = res
            console.log(users)
            li1 = ""
            for (i = 0; i < n; i++) {
                li1 = li1 + `<tr>
            <th scope="row">${users[i]._id}</th>
            <td>${users[i].name}</td>
            <td>${users[i].email}</td>
            <td>
            <a id="${users[i]._id}" href="/admin/userEwaste.html" target="_blank" >Visit Profile</a>
            </td>
            </tr>`
            }
            table1.innerHTML = li1
        })
        .catch((err) => console.log(err))
}

getAll()

const newEwastesCount = () =>{
    fetch('/api/v1/newewaste/count')
        .then(res => res.json())
        .then((res)=>{
            console.log(res)
            document.getElementById('count').textContent=res.count
        }).catch((err)=>{
            document.getElementById('count').textContent="Error"
        })
}

newEwastesCount()

table1.addEventListener("click", (e) => {
    if (e.target.matches('a')) {
        console.log("clicked", e.target.id)
        localStorage.setItem("userid", e.target.id)
    }
})

