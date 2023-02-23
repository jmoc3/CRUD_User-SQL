

const loadData = async()=>{

    const allUsers = await fetch('/user/all');
    const allDataUsers = await allUsers.json()
    console.log(allDataUsers)

    const user = await fetch(`/user/one/5`);
    const [dataUser] = await user.json()


}

loadData()

const button = document.querySelector(".send");
button.addEventListener('click',async ()=>{

    const nameUser = document.querySelector('.name').value;
    const emailUser = document.querySelector('.email').value;
    const ageUser = document.querySelector('.age').value;

    if(!nameUser || !emailUser || !ageUser){
        
        const preAlert = document.querySelector('.alert')
        if(preAlert) preAlert.remove()

        const alert = document.createElement('span')
        alert.className = 'alert'
        alert.textContent = 'Por favor llenar todos los datos de los inputs'

        const fatherSendBox = document.querySelector('.sendParent')
        fatherSendBox.appendChild(alert)

        return
    }

    if(ageUser<=0){

        const preAlert = document.querySelector('.alert')
        if(preAlert) preAlert.remove()

        const alert = document.createElement('span')
        alert.className = 'alert'
        alert.textContent = 'Por favor digite una edad racional'

        const fatherSendBox = document.querySelector('.sendParent')
        fatherSendBox.appendChild(alert)

        return

    }

    const User = {
        nombre: nameUser,
        email: emailUser,
        edad: ageUser
    }

    const response = await fetch('user/create',{
        method: 'post',
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(User)
    })

    const created = await response.json()

    if(created.response != 0)  window.location='/'

})


const updateButton = document.querySelectorAll(".update");
updateButton.forEach(e=>{

    e.addEventListener('click',async (updateButton)=>{

        const preAlert = document.querySelector('.alert')
        if(preAlert) preAlert.remove()

        const id = updateButton.target.id
        console.log(id)
        const user = await fetch(`user/one/${id}`,{
        method:'get'
    })

    const [userData] = await user.json()
    
    document.querySelector('.name').value = userData.nombre;
    document.querySelector('.email').value = userData.email;
    document.querySelector('.age').value = userData.edad;
    
    const sendButton = document.querySelector('.send')


    if(sendButton){

        const newUpdateButton = document.createElement('button')
        newUpdateButton.className = 'realUpdate'
        newUpdateButton.textContent = "Actualizar en definitivo!!!"
    
        newUpdateButton.addEventListener('click',async(btn)=>{

        const nameUser = document.querySelector('.name').value;
        const emailUser = document.querySelector('.email').value;
        const ageUser = document.querySelector('.age').value;
        
        const userUpdated = {
            nombre:nameUser,
            email:emailUser,
            edad:ageUser
        }

        const userToUpdate = await fetch(`user/update/${id}`,{
            method:'put',
            headers:{
                'Content-type':"application/json"
            },
            body: JSON.stringify(userUpdated)
        })
        
        const response = await userToUpdate.json() 
        
        if(response.response != 0) window.location = '/'

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
            
            const id = deleteBtn.target.id;
            
            const userToDelete = await fetch(`user/delete/${id}`,{
                method:'delete'
            })
            
            const userDeleted = await userToDelete.json()
            if(userDeleted.response != 0) window.location = '/'
        })
    })
    