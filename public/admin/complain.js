const getMessages = async () => {
    fetch('/api/v1/allmessages')
        .then(res => res.json())
        .then((res) => {
            li = ""
            const { messages } = res
            var m = messages.length
            for (i = 0; i < m; i++) {

                if (!messages[i].complete) {
                    li = li + `<tr>
            <td>${messages[i].message}</td>
            <td><textarea cols="70" rows="2" placeholder="Hello" id="${messages[i]._id}input"></textarea></td>
            <td>
                <button id=${messages[i]._id} class='btn btn-primary'>Send</button> 
            </td>
            </tr>`
                }
            }

            document.getElementById('table2').innerHTML = li

        })
        .catch(error => {
            console.log(error)
        })
}
setInterval(() => {
    getMessages()
}, 3000);

var table2 = document.getElementById('table2')


table2.addEventListener("click", (e) => {
    if (e.target.matches('button')) {
        //console.log("clicked", e.target.id)
        const _id=e.target.id
        const reply = document.getElementById(`${_id}input`).value
        if(!reply || reply=="")
        {
            return alert('Please enter a reply')
        }
        const content = {
            reply,
            _id
        }
        console.log(JSON.stringify(content))
        fetch("/api/v1/reply",
            {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(content)
            })
            .then(res=>res.json())
            .then((res)=>{
                if(!res.success)
                    return alert(`${res.message}`)
                window.location.reload()
            })
            .catch(error=>{
                console.log(error)
                return alert('There is problem')
            })  
    }
})