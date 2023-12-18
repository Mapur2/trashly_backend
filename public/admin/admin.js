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
            <a id="${users[i]._id}" href="http://localhost:3000/admin/userEwaste.html" target="_blank" >Visit Profile</a>
            </td>
            </tr>`
            }
            table1.innerHTML = li1
        })
        .catch((err) => console.log(err))
}

getAll()

table1.addEventListener("click", (e) => {
    if (e.target.matches('a')) {
        console.log("clicked", e.target.id)
        localStorage.setItem("userid", e.target.id)
    }
})