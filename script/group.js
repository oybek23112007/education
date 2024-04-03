const tbody = document.querySelector('.tbody')
const add = document.querySelector('.add-group')
const course = document.querySelector('.course')
const teacher = document.querySelector('.teacher')
const name = document.querySelector('.name')
const surname = document.querySelector('.surname')
const phone = document.querySelector('.phone')
const addGroup = document.querySelector('.add')
const editSave = document.querySelector('.editSave')
const start = document.querySelector('.start')
const end = document.querySelector('.end')
editSave.style.display = 'none'

let receptions = []
let editReceptions = []

window.addEventListener('load',()=>{
    getGroup()
})

function getGroup(){
    fetch('https://65c238cff7e6ea59682ae8a3.mockapi.io/group')
    .then(response=>response.json())
    .then(data=>{
        receptions = data
        innerGroup(data)
    })
    .catch(error=>console.log(error))
}

function innerGroup(el){
    tbody.innerHTML=''
    el.forEach(element => {
       tbody.innerHTML+=`<tr>
       <td>${element.name}</td>
       <td>${element.course.name}</td>
       <td>${element.teacher.name}</td>
       <td>${element.start} - ${element.end}</td>
       <td>
           <div class="table-action">
               <span class="remove-reception" onclick="removeGroup(${element.id})">
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
    teacher.innerHTML = ''
    getAlCourse()
    getAlTeacher()
})

function getAlCourse(){
    fetch('https://65c238cff7e6ea59682ae8a3.mockapi.io/course')
    .then(response=>response.json())
    .then(data=>{
        data.forEach(item=>{
            course.innerHTML+=`<option value='${JSON.stringify(item)}'>${item.name}</option>`
        })
    })
    .catch(error=>console.log(error))
}



function getAlTeacher(){
    fetch('https://65c238cff7e6ea59682ae8a3.mockapi.io/teacher')
    .then(response=>response.json())
    .then(data=>{
        data.forEach(item=>{
            teacher.innerHTML+=`<option value='${JSON.stringify(item)}'>${item.name}</option>`
        })
    })
    .catch(error=>console.log(error))
}


addGroup.addEventListener('click',()=>{
    let newGroup= {
        name: name.value,
        start: start.value,
        end:start.value,
        course:JSON.parse(course.value),
        teacher:JSON.parse(teacher.value),
        students:[]
    }
    console.log(newGroup)

    fetch('https://65c238cff7e6ea59682ae8a3.mockapi.io/group',{
        method:'POST',
        body:JSON.stringify(newGroup),
        headers:{
            'Content-type':'application/json'
        }
    })
    .then(response=>response.json())
    .then(data=>{
        getGroup();
        name.value = ''
        start.value = ''
        end.value = ''
        course.value = ''
        teacher.value = ''
    })
    .catch(error=>console.log(error))
})


function removeGroup(id){
    fetch(`https://65c238cff7e6ea59682ae8a3.mockapi.io/teacher/${id}`,{
        method:'DELETE'
    })
    .then(respone=>respone.json())
    .then(data=>{
        getGroup()
    })
    .catch(error=>console.log(error))
}

function openModal(data){
    editSave.style.display = 'block'
    addGroup.style.display = 'none'
    editReceptions = data
    name.value = data.name
    surname.value = data.surname
    phone.value = data.phone
    // getAlCourse()
    course.innerHTML = `<option value='${JSON.stringify(data.course)}'>${data.course.name}</option>`
}

editSave.addEventListener('click',()=>{
    let newGroup= {
        name: name.value,
        surname: surname.value,
        phone:phone.value,
        course:JSON.parse(course.value)
    }

    fetch(`https://65c238cff7e6ea59682ae8a3.mockapi.io/teacher/${editReceptions.id}`,{
        method:'PUT',
        body:JSON.stringify(newGroup),
        headers:{
            'Content-type':'application/json'
        }
    })
    .then(response=>response.json())
    .then(data=>{
        getGroup();
        name.value = ''
        surname.value = ''
        phone.value = ''
        course.value = ''
        editReceptions = null
        editSave.style.display = 'none'
        addGroup.style.display = 'block'
    })
    .catch(error=>console.log(error))
})


start.addEventListener('input',()=>{
    startArr = start.value.split('-')
    startYear = startArr[0]
    startMonth = startArr[1]
    startDay = startArr[2]
    endDay = startDay + JSON.parse(course.value).duration
    let endYear = 2023
    if(endDay>12){
        endDay-=12
        endYear++
    }
    console.log(endDay);
    console.log(endYear);
})

