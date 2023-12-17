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
          </tr>`
            }
            table1.innerHTML = li1
        })
        .catch((err) => console.log(err))
}

getAll()
