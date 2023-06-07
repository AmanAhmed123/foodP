let PriceI = document.querySelector(".items-card");
let span = document.querySelector(".adres");
let loveAdd = document.querySelectorAll(".loveAdd");
let addToCard = document.querySelector(".addToCard");
let itemA = document.querySelector(".item");
let ArryofCards = document.querySelectorAll(".card");
let ItemCard = document.querySelector(".Item-Card");
let ItemCard2 = document.querySelector(".Item-Card2");
let ItemCard23 = document.querySelector(".Item-Card23");
let finalPrice2 = document.querySelector(".finalPrice2")

let conterPI = 0
let conter = 0
let arr = []
let arr2 = []
let arr3 = []
let arrN = []
let finel = 0

if (itemA.innerHTML.trim() == "") {
    ItemCard.innerHTML = conter
    ItemCard2.innerHTML = conter
}

if (localStorage.getItem("taskes")) {
    arr = JSON.parse(localStorage.getItem("taskes"))
    conter = arr.length
    ItemCard.innerHTML = conter
    ItemCard2.innerHTML = conter
}
if (localStorage.getItem("obj2")) {
    arr2 = JSON.parse(localStorage.getItem("obj2"))
    arr2.forEach(ele => {
        ArryofCards[ele.ind2].setAttribute("id",ele.idKey) 
    })
}
if (localStorage.getItem("obj3")) {
    arrN = JSON.parse(localStorage.getItem("obj3"))
}
if (window.localStorage.getItem("finelHa")) {
    arrH = JSON.parse(window.localStorage.getItem("finelHa"))
}
if (window.localStorage.getItem("ppp")) {
    ItemCard23.innerHTML = window.localStorage.getItem("ppp")
    if (ItemCard23.innerHTML == 40 || ItemCard23.innerHTML > 40) {
        finalPrice2.classList.add("FreeDlevery")
    }else {
        finalPrice2.classList.remove("FreeDlevery")
    }
}
andnew()


PriceI.onclick = function() {
    addToCard.classList.toggle("change")
}

loveAdd.forEach((ele,ind) => {
    ele.onclick = function() {
        ele.classList.toggle("AddLoveEle")
        if (ele.classList.contains("AddLoveEle")) {
            ItemCard.innerHTML  = ""
            let obj = {
                img: ele.parentElement.parentElement.children[1].children[0].children[0].src.slice(22),
                nameDiv: ele.parentElement.parentElement.children[2].children[0].textContent,
                price: ele.parentElement.parentElement.children[2].children[1].textContent.slice(2),
                num: ind,
                id: Date.now(),
                }
            let obj2 = {
                idKey: obj.id,
                ind2: ind
            }
            let obj3 = {
                id: obj.id
            }
            arr2.push(obj2)
                ele.parentElement.parentElement.setAttribute("id",obj.id)
                arr.push(obj)
                arrN.push(obj3)
                addElement(arr)
                addTolocal(arr)
                setObj2()
                setObj3()
                TotlePrice()
                conter = arr.length
                ItemCard.innerHTML = conter
                ItemCard2.innerHTML = conter
        }
        ele.innerHTML === "Add" ? ele.innerHTML="done":ele.innerHTML = "Add";
    }
})

function addElement(arr) {
    itemA.innerHTML = ""
    arr.forEach((ele) => {
        let imgDiv = document.createElement("div");
        imgDiv.className = "img-div";
        let imgCard = document.createElement("div");
        imgCard.className = "img-Card"
        imgDiv.appendChild(imgCard)
        let img = document.createElement("img");
        img.src = ele.img
        imgCard.appendChild(img)
        imgDiv.appendChild(imgCard)
        itemA.appendChild(imgDiv)
        let divText = document.createElement("div");
        divText.className = "textA"
        let pText = document.createElement("p");
        pText.innerHTML = ele.nameDiv;
        divText.appendChild(pText)
        itemA.appendChild(divText)
        let ChanksBox = document.createElement("div");
        ChanksBox.className = "ChanksBox"
        let span1 = document.createElement("span");
        span1.className = "EN";
        span1.innerHTML = "-"
        ChanksBox.appendChild(span1)
       let span3= document.createElement("span")
       span3.className = "UseCheakNumber"
         span3.appendChild(document.createTextNode("1"))
         ChanksBox.appendChild(span3)
        let span2 = document.createElement("span");
        span2.className = "EA"
        span2.innerHTML = "+"
        ChanksBox.appendChild(span2)
        itemA.appendChild(ChanksBox)
        let priceA = document.createElement("div");
        priceA.className = "priceA"
        let doller = document.createElement("span");
        doller.appendChild(document.createTextNode("$"))
        priceA.appendChild(doller);
        let priceACash = document.createElement("span");
        priceACash.className = "priceACash"
        priceACash.appendChild(document.createTextNode(ele.price))
        priceA.appendChild(priceACash)
        itemA.appendChild(priceA)

        CheakNumbers()
    })
}

function CheakNumbers() {
    let EA = document.querySelectorAll(".EA");
    let UseCheakNumber = document.querySelectorAll(".UseCheakNumber");
    let EN = document.querySelectorAll(".EN");
    let newplan = document.querySelectorAll(".priceACash");
    let bric = 0

    EA.forEach((ele,ind)=> {
        ele.onclick = function(){ 
            let conter = parseInt(UseCheakNumber[ind].innerHTML)
            let newconter = conter +=1
            UseCheakNumber[ind].innerHTML = newconter
            bric = arr[ind].price
          newplan[ind].innerHTML = arr[ind].price
           let priceACashW = parseInt(bric);
            let  priceACashWP = priceACashW * newconter
            finel += priceACashWP
            let objB = {
             num: UseCheakNumber[ind].innerHTML,
             ind: ind,
          }
          window.localStorage.setItem(`finelHa${arrN[ind].id}`, finel)
          newplan[ind].innerHTML  = window.localStorage.getItem(`finelHa${arrN[ind].id}`)
         finel = 0
       window.localStorage.setItem(`numbersOf${arrN[ind].id}`, JSON.stringify(objB))
       TotlePrice ()
     }
     if (window.localStorage.getItem(`finelHa${arrN[ind].id}`)) {
        newplan[ind].innerHTML = window.localStorage.getItem(`finelHa${arrN[ind].id}`)
     }
     if (window.localStorage.getItem(`numbersOf${[arrN[ind].id]}`)) {
        let WorkFor = JSON.parse(window.localStorage.getItem(`numbersOf${arrN[ind].id}`))

        UseCheakNumber[ind].innerHTML = WorkFor.num
     }
    })

    EN.forEach((ele,ind)=> {
        ele.onclick = function(){
          if (UseCheakNumber[ind].innerHTML == 1) {
                 UseCheakNumber[ind].innerHTML = 1
                 newplan[ind].innerHTML = arr[ind].price
          }else {
            let conter2 = parseInt(UseCheakNumber[ind].innerHTML)
            let newconter2 = conter2 -=1
            UseCheakNumber[ind].innerHTML = newconter2
            bric = arr[ind].price
             let priceACashW2 = parseInt(bric);
             let  priceACashWP2 = priceACashW2 *  newconter2
             finel +=  priceACashWP2  
             let objB = {
                 num: UseCheakNumber[ind].innerHTML,
                 ind: ind,
              }
             window.localStorage.setItem(`finelHa${arrN[ind].id}`, finel)
             newplan[ind].innerHTML = window.localStorage.getItem(`finelHa${arrN[ind].id}`)
              finel = 0
             window.localStorage.setItem(`numbersOf${arrN[ind].id}`, JSON.stringify(objB))
             TotlePrice ()
          }
        }

        if (window.localStorage.getItem(`numbersOf${arrN[ind].id}`)) {
            let WorkFor = JSON.parse(window.localStorage.getItem(`numbersOf${arrN[ind].id}`))
            UseCheakNumber[ind].innerHTML = WorkFor.num

      }
      if (window.localStorage.getItem(`finelHa${arrN[ind].id}`)) {
        newplan[ind].innerHTML = window.localStorage.getItem(`finelHa${arrN[ind].id}`)
     }
    })

}
function TotlePrice() {
    let h = document.querySelectorAll(".priceACash")
    let p = []
    h.forEach(ele => {
        p.push(ele.innerHTML)
    })
    let ppp = p.reduce(function(acc,crunt) {
       return Number(acc) + Number(crunt)
    })
    
    ItemCard23.innerHTML = ppp
    if (ItemCard23.innerHTML == 40 || ItemCard23.innerHTML > 40) {
        finalPrice2.classList.add("FreeDlevery")
    }else {
        finalPrice2.classList.remove("FreeDlevery")
    }
    window.localStorage.setItem("ppp", ppp)
    p = []

}
function  setObj2(){
    window.localStorage.setItem("obj2",JSON.stringify(arr2))
}
function  setObj3(){
    window.localStorage.setItem("obj3",JSON.stringify(arrN))
}

function addAddToCard(cheakeTow) {
    let arr3 = []
    cheakeTow.forEach(ele => {
        arr3.push(ele.num)
    })
   arr3.map(ele => {
       ArryofCards[ele].children[0].children[1].classList.add("AddLoveEle");
       ArryofCards[ele].children[0].children[1].innerHTML= "done"
   })

}
ArryofCards.forEach((eleA,ind) => {
    eleA.onclick = function(){
        if (eleA.children[0].children[1].classList.contains("AddLoveEle")) {
        }else {
            treToPut(eleA.getAttribute("id"),ind)
        }
    }
})

function  treToPut(idShow,ind) {
        arr = arr.filter((ele) => ele.id != idShow)
        conter = arr.length
        ItemCard2.innerHTML = conter
        ItemCard.innerHTML = conter
        arr2 = arr2.filter((eleA) => eleA.idKey != idShow)
        arrN = arrN.filter((eleB) => eleB.id != idShow)
        setObj2(arr2)
        setObj3(arrN)
            addTolocal(arr)
            addElement(arr)
         window.localStorage.removeItem(`numbersOf${idShow}`)
         window.localStorage.removeItem(`finelHa${idShow}`)
         window.localStorage.removeItem("ppp")
         ItemCard23.innerHTML = 0
         TotlePrice()
}

function andnew() {
    let Cheak = window.localStorage.getItem("taskes");
    if (Cheak) {
        let cheakeTow = JSON.parse(Cheak);
        addElement(cheakeTow)
        addAddToCard(cheakeTow)
    }
}

function addTolocal(arr) {
    window.localStorage.setItem("taskes", JSON.stringify(arr))
}


// window.localStorage.clear()
