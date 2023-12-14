const addTask = document.querySelector(".btn")
const totalHour = document.querySelector(".total-hour")
const totalBadhour = document.querySelector(".saved-hour")


//create an array for entrylist
let entryTasklist =[]

//create an array fro bad list
let badTasklist=[]


let totalHourAllocated =0
let badHourAllocated =0





addTask.addEventListener('click',()=>{
    let taskValue = document.querySelector(".task")
    let hourValue = document.querySelector(".hour")
    let entrylist = document.querySelector(".entrylist")

    //check if user input is valid
    if(taskValue.value.trim()=='' || hourValue.value.trim()==''){
        alert('please enter proper value before adding')
        return
    }

    //create an object to store taskvalue and hour value
    let obj={}
    obj[taskValue.value]=hourValue.value

    //push object to array
    entryTasklist.push(obj)


    

   
    
    
    
// creating eachlist---------------------------------------------------------------
    //create div to which contain each entry lsit
    const eachlist = document.createElement('div')
    eachlist.classList.add('eachEntrylist')
    entrylist.appendChild(eachlist)
    
    
    //create div which conatin numberv and task
     const first = document.createElement('div')
    first.classList.add('first')
    eachlist.appendChild(first)
    
     const number = document.createElement('div')
     const par = document.createElement('p')
    number.classList.add('number')
    par.classList.add('para')
    first.appendChild(number)
    first.appendChild(par)
    
    //create div to show hour spent
     const eachHour = document.createElement('div')
    eachHour.classList.add('eachHour')
    eachlist.appendChild(eachHour)
    
    //div for deleteing and moving task
     const edit = document.createElement('div')
    edit.classList.add('edit')
    eachlist.appendChild(edit)
    
    
    //for deleteing task
    const deleteButton = document.createElement('div')
    deleteButton.setAttribute('class','delet')
    edit.appendChild(deleteButton)
    deleteButton.innerHTML=`<i class="fa-regular fa-trash-can"></i>`
    
    //moving task
    const rightArrow = document.createElement('div')
    rightArrow.classList.add('move-right')
    edit.appendChild(rightArrow)
    rightArrow.innerHTML=`<i class="fa-solid fa-arrow-right"></i>`

    // finishec creating each list----------------------------------------------------------------------------
    
    // number.innerText=sequence
    rightArrow.onclick=function(){
        moveTask(eachlist,eachHour,par)
    }
    deleteButton.onclick=function(){
        deleteTask(eachlist,par)
    }
    

    
   taskValue.value=''
   hourValue.value=''

    
   

    strToDisplay(par,eachHour,number)
    
    calculateTotal()
    calculateBadHour()
     

})

//moving task form entrylist to bad list and vice verse

function moveTask(eachlist,eachHour,par){
   let entrylist = document.querySelector(".entrylist")
   let badlist= document.querySelector('.badlist')

   if(entrylist.contains(eachlist)){

        let obj={}
    obj[par.innerText]=eachHour.innerText

    badTasklist.push(obj)

    console.log('this is',badTasklist)


    let index=entryTasklist.findIndex((element)=>{
        return element[par.innerHTML]
    })

    
    entryTasklist.splice(index,1)
    calculateBadHour()
    console.log(eachlist)
    


    

    entrylist.removeChild(eachlist)
    badlist.appendChild(eachlist)


     //update arrow button
   eachlist.querySelector('.move-right').innerHTML=`<i class="fa-solid fa-arrow-left"></i>`
   eachlist.querySelector('.edit').style.flexDirection = 'row-reverse'
   eachlist.querySelector('.move-right').style.background='orange'
   
   eachlist.querySelector('.move-right').onclick = function(){
    moveTask(eachlist,eachHour,par)
   }
   } else if(badlist.contains(eachlist)){

    

    let objOne={}
    objOne[par.innerText]=eachHour.innerText

    entryTasklist.push(objOne)

    console.log('this is',badTasklist)


    let index=badTasklist.findIndex((element)=>{
        return element[par.innerHTML]
    })

    
    badTasklist.splice(index,1)
    calculateBadHour()
    console.log(eachlist)


    //moveback to entry list
    badlist.removeChild(eachlist)
    entrylist.appendChild(eachlist)

    //update arrow button for entrylist
    eachlist.querySelector('.move-right').innerHTML=`<i class="fa-solid fa-arrow-right"></i>`
    eachlist.querySelector('.move-right').style.background='green'
    eachlist.querySelector('.edit').style.flexDirection = 'row'
    eachlist.querySelector('.move-right').onclick=function(){
        moveTask(eachlist,eachHour,par)
    }
   }

  

}

//deleteing task
function deleteTask(eachlist,par){
    let entrylist = document.querySelector(".entrylist")
    let badlist= document.querySelector('.badlist')
    if(entrylist.contains(eachlist)){
        
        let index=entryTasklist.findIndex((element)=>{
            return element[par.innerHTML]
        })
        console.log(index)
        entryTasklist.splice(index,1)

    }else if(badlist.contains(eachlist)){
        let index=badTasklist.findIndex((element)=>{
            return element[par.innerHTML]
        })
        console.log(index)
        badTasklist.splice(index,1)

    }
    eachlist.remove()
        
        calculateTotal()
        calculateBadHour()

}

//calculating total hour
const calculateTotal=()=>{
     totalHourAllocated=0
    entryTasklist.forEach((element)=>{
        for(let item in element){
            totalHourAllocated+=Number(element[item])
        }
    })
    badTasklist.forEach((element)=>{
        for(let item in element){
            totalHourAllocated+=Number(element[item])
        }
    })
    
    return totalHour.innerText=totalHourAllocated
    
}
calculateTotal()
//calculate total bad hour
const calculateBadHour=()=>{
    badHourAllocated=0
    badTasklist.forEach((element)=>{
        for(let item in element){
            badHourAllocated+=Number(element[item])
        }
    })
    return totalBadhour.innerText=badHourAllocated
}
calculateBadHour()
const strToDisplay=(task,hour,serialnumber)=>{
    entryTasklist.forEach((item)=>{
        for(let element in item){
            
           task.innerHTML=element
           hour.innerText=item[element]
           serialnumber.innerText=entryTasklist.indexOf(item)+1
           
        }
    })
    
}



