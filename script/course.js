const courseBox = document.querySelector('.courses-box')
const name = document.querySelector('.name')
const duration = document.querySelector('.duration')
const url = document.querySelector('.url')
const price = document.querySelector('.price')
const add = document.querySelector('.add')
const editSave = document.querySelector('.editSave')
const editBtn = document.querySelector('.edit-btn')
editSave.style.display='none'

window.addEventListener('load', getCourses())

function getCourses(){
    
    fetch('https://65c238cff7e6ea59682ae8a3.mockapi.io/course')
    .then(res=>res.json())
    .then(data=>{
        innerCourses(data)
    })
    .catch(error=>console.log(error))
}

// function innerCourses(el){
//     courseBox.innerHTML = ''
//     el.forEach(e => {
//         courseBox.innerHTML += `<div class="course">
//         <img src="${e.url}">
//         <h1 class="course-title">${e.name}</h1>
//         <p class="course-duration">Duration: <span>${e.duration} month</span></p>
//         <p class="course-price">Price: <span>${e.price}UZS/Month</span></p>
//         <div class="buttons">
//             <div class="delete-and-edit">
//                 <div class="delete-btn" onclick="removeCourse(${e.id})"><i class="bi bi-trash"></i></div>
//                 <div class="edit-btn" onclick="openModal(${JSON.stringify(e)})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-square"></i></div>
//             </div>
//         </div>
//     </div>`
//     });
// }

add.addEventListener('click', ()=>{
    let newCourse = {
        name: name.value,
        duration: duration.value,
        url: url.value,
        price: price.value
    }

    fetch('https://65c238cff7e6ea59682ae8a3.mockapi.io/course',{
        method:'POST',
        body: JSON.stringify(newCourse),
        headers:{
            'Content-type': 'application/json'
        }
    })
    .then(res=>res.json())
    .then(data=>{
        getCourses()
        name.value=''
        duration.value=''
        url.value=''
        price.value=''
    })
    .catch(error=>console.log(error))
})

function removeCourse(id){
    fetch(`https://65c238cff7e6ea59682ae8a3.mockapi.io/course/${id}`,{
        method:'DELETE'
    })
    .then(res=>res.json())
    .then(data=>{
        getCourses()
    })
    .catch(error=>console.log(error))
}

function openModal(data){
    add.style.display='none'
    editSave.style.display='block'
}

// myporject

function innerCourses(el){
    courseBox.innerHTML = ''
    el.forEach(e => {
        courseBox.innerHTML += `
        <div class="course-box2">
        <div class="course-imgs">
        <img class="course-img" src="${e.url}" alt="">
        <i class="bi bi-three-dots-vertical">
        <div class="buttons">
        <div class="delete-and-edit">
            <div class="delete-btn" onclick="removeCourse(${e.id})"><i class="bi bi-trash"></i></div>
            <div class="edit-btn" onclick="openModal(${JSON.stringify(e)})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-square"></i></div>
        </div>
    </div>
        </i>                      
    </div>
    <h1 class="course-title">${e.name}</h1>
   <div class="course-durations">
    <h1 class="course-duration">Duration:</span></h1>
    <h1 class="course-duration2"><span>${e.duration} month</h1>
   </div>
   <div class="course-prices">
    <h1 class="course-price">Price:</h1>
    <h1 class="course-price2"><span>${e.price}UZS/Month</span></h1>
   </div>
   <div class="course-line"></div>
   <h1 class="course-text">zor kurs</h1>
  </div>
  `
    });
}

