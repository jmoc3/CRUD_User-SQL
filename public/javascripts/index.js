const data = async()=>{

    const allUsers = await fetch('user/all',{
        method:'get'
    })
    const usersData = await allUsers.json()

    if(!usersData.users.length){
        document.querySelector('.anything').style.display = 'flex'
        return
    }

    document.querySelector('.anything').style.display = 'none'

}

data()
loadBtnsFunction()

const button = document.querySelector(".send");
button.addEventListener('click',async ()=>{

    const nameUser = document.querySelector('.name').value;
    const emailUser = document.querySelector('.email').value;
    const ageUser = document.querySelector('.age').value;

    if(!nameUser || !emailUser || !ageUser){
        throwMessage('Por favor llenar todos los datos de los inputs','rgb(215, 99, 99)')
        return
    }

    if(ageUser<=0){
        throwMessage('Por favor digite una edad racional', 'rgb(215, 99, 99)')
        return
    }

    const searchByEmail = await fetch(`user/email/${emailUser}`,{
        method:'get'
    })
    const existEmail = await searchByEmail.json() 

    if(existEmail.user){
        throwMessage('Email ya existente','rgb(215, 99, 99)')
        return
    }

    const User = {
        name: nameUser,
        email: emailUser,
        age: ageUser
    }

    const response = await fetch('user/create',{
        method: 'post',
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(User)
    })
    const created = await response.json()

    if(created.response.affectedRows != 0){

        const user = await fetch(`user/one/${created.response.insertId}`,{
                    method:'get'
        })
        const dataUser = await user.json()

        cleanInputs()
        data()
        setTimeout(_=>{
            loadRow(dataUser[0])
            loadBtnsFunction()
        },10)

    }            
})
    
function throwMessage(message, color){

    const preAlert = document.querySelector('.alert')
    if(preAlert) preAlert.remove()

    const alert = document.createElement('span')
    alert.className = 'alert'
    alert.style.color = color
    alert.textContent = message

    const fatherSendBox = document.querySelector('.sendParent')
    fatherSendBox.appendChild(alert)

    setTimeout(_=>{
        alert.remove()
    },2000)

}

function loadRow(user){

    const table = document.querySelector('.body')
    const row = document.createElement('tr')
    row.id = user.id

    const id = document.createElement('td')
    id.textContent = user.id

    const name = document.createElement('td')
    name.textContent = user.name

    const email = document.createElement('td')
    email.textContent = user.email

    const age = document.createElement('td')
    age.textContent = user.age

    const btns = document.createElement('td')

    const updateBtn = document.createElement('button')
    updateBtn.textContent = "Actualizar"
    updateBtn.className = 'actionButtons update'
    updateBtn.id = user.id

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = "Eliminar"
    deleteBtn.className = 'actionButtons delete'
    deleteBtn.id = user.id

    btns.appendChild(updateBtn)
    btns.appendChild(deleteBtn)

    row.appendChild(id)
    row.appendChild(name)
    row.appendChild(email)
    row.appendChild(age)
    row.appendChild(btns)

    table.appendChild(row)
}

function loadBtnsFunction(){
             
    const updateButton = document.querySelectorAll(".update");
    updateButton.forEach(e=>{

        e.addEventListener('click',async (updateButton)=>{

            const preAlert = document.querySelector('.alert')
            if(preAlert) preAlert.remove()

            const row = updateButton.target.parentElement.parentElement
            const id = row.id;
            const user = await fetch(`user/one/${id}`,{
            method:'get'
            })
        
        
        const userData = await user.json()

        document.querySelector('.name').value = userData[0].name;
        document.querySelector('.email').value = userData[0].email;
        document.querySelector('.age').value = userData[0].age;
        
        const sendButton = document.querySelector('.send')


            if(sendButton){

                const newUpdateButton = document.createElement('button')
                newUpdateButton.className = 'realUpdate'
                newUpdateButton.textContent = "Actualizar en definitivo!!!"
            
                newUpdateButton.addEventListener('click',async()=>{

                const nameUser = document.querySelector('.name').value;
                const emailUser = document.querySelector('.email').value;
                const ageUser = document.querySelector('.age').value;
                
                const userUpdated = {
                    name:nameUser,
                    email:emailUser,
                    age:ageUser
                }

                const userToUpdate = await fetch(`user/update/${id}`,{
                    method:'put',
                    headers:{
                        'Content-type':"application/json"
                    },
                    body: JSON.stringify(userUpdated)
                })
                const response = await userToUpdate.json() 
                
                if(response.response != 0){

                    const newUpdateButton = document.querySelector('.realUpdate')
                    newUpdateButton.remove()

                    const send = document.createElement('button')
                    send.className = 'send'
                    send.textContent = "Enviar"

                    const fatherButton = document.querySelector('.sendBox')
                    fatherButton.appendChild(send)

                    row.remove()
                    cleanInputs()

                    const user = await fetch(`user/one/${id}`,{
                        method:'get'
                        })
                    const userData = await user.json()
                    
                    loadRow(userData[0])
                    loadBtnsFunction()
                    throwMessage('User Updated!!!', 'rgb(108, 185, 133)')
                } 
            })

            
            const fatherButton = document.querySelector('.sendBox')
                button.remove()
                fatherButton.appendChild(newUpdateButton)
            }

        })
    })

    const deleteButton = document.querySelectorAll('.delete')
        deleteButton.forEach(e=>{
            e.addEventListener('click',async(deleteBtn)=>{
                
                const row = deleteBtn.target.parentElement.parentElement
                const id = row.id;
                const userToDelete = await fetch(`user/delete/${id}`,{
                    method:'delete'
                })
                const userDeleted = await userToDelete.json()

                if(userDeleted.response != 0){
                    cleanInputs()
                    row.remove()         
                    data()
                }
            })
        })

}

function cleanInputs(){

    document.querySelector('.name').value = "";
    document.querySelector('.email').value = "";
    document.querySelector('.age').value = "";    

}