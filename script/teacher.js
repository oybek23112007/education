const tbody = document.querySelector('.tbody')
const add = document.querySelector('.add-teacher')
const course = document.querySelector('.course')
const name = document.querySelector('.name')
const surname = document.querySelector('.surname')
const phone = document.querySelector('.phone')
const addTeacher = document.querySelector('.add')
const editSave = document.querySelector('.editSave')
editSave.style.display = 'none'

let receptions = []
let editReceptions = []

window.addEventListener('load',()=>{
    getTeacher()
})

function getTeacher(){
    fetch('https://65c238cff7e6ea59682ae8a3.mockapi.io/teacher')
    .then(response=>response.json())
    .then(data=>{
        receptions = data
        innerTeacher(data)
    })
    .catch(error=>console.log(error))
}

function innerTeacher(el){
    tbody.innerHTML=''
    el.forEach(element => {
       tbody.innerHTML+=`<tr>
       <td>${element.name}</td>
       <td>${element.surname}</td>
       <td>${element.phone}</td>
       <td>${element.course.name}</td>
       <td>
           <div class="table-action">
               <span class="remove-reception" onclick="removeTeacher(${element.id})">
                   <i class="bi bi-trash"></i>
               </span>
               <span class="edit-reception" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick='openModal(${JSON.stringify(element)})'>
                   <i class="bi bi-pen"></i> </span>
           </div>
       </td>
   </tr>` 
    });
}

window.addEventListener('load',()=>{
    course.innerHTML = ''
    getAlCourse()
})

function getAlCourse(){
    fetch('https://65c238cff7e6ea59682ae8a3.mockapi.io/course')
    .then(response=>response.json())
    .then(data=>{
        data.forEach(item=>{
            debugger
            course.innerHTML+=`<option value='${JSON.stringify(item)}'>${item.name}</option>`
        })
    })
    .catch(error=>console.log(error))
}

addTeacher.addEventListener('click',()=>{
    let newTeacher= {
        name: name.value,
        surname: surname.value,
        phone:phone.value,
        course:JSON.parse(course.value)
    }

    fetch('https://65c238cff7e6ea59682ae8a3.mockapi.io/teacher',{
        method:'POST',
        body:JSON.stringify(newTeacher),
        headers:{
            'Content-type':'application/json'
        }
    })
    .then(response=>response.json())
    .then(data=>{
        getTeacher();
        name.value = ''
        surname.value = ''
        phone.value = ''
        course.value = ''
    })
    .catch(error=>console.log(error))
})


function removeTeacher(id){
    fetch(`https://65c238cff7e6ea59682ae8a3.mockapi.io/teacher/${id}`,{
        method:'DELETE'
    })
    .then(respone=>respone.json())
    .then(data=>{
        getTeacher()
    })
    .catch(error=>console.log(error))
}

function openModal(data){
    editSave.style.display = 'block'
    addTeacher.style.display = 'none'
    editReceptions = data
    name.value = data.name
    surname.value = data.surname
    phone.value = data.phone
    getAlCourse()
    course.innerHTML = `<option value='${JSON.stringify(data.course)}'>${data.course.name}</option>`
}

editSave.addEventListener('click',()=>{
    let newTeacher= {
        name: name.value,
        surname: surname.value,
        phone:phone.value,
        course:JSON.parse(course.value)
    }

    fetch(`https://65c238cff7e6ea59682ae8a3.mockapi.io/teacher/${editReceptions.id}`,{
        method:'PUT',
        body:JSON.stringify(newTeacher),
        headers:{
            'Content-type':'application/json'
        }
    })
    .then(response=>response.json())
    .then(data=>{
        getTeacher();
        name.value = ''
        surname.value = ''
        phone.value = ''
        course.value = ''
        editReceptions = null
        editSave.style.display = 'none'
        addTeacher.style.display = 'block'
    })
    .catch(error=>console.log(error))
})