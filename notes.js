console.log("welcome to perfect notes");
showCards();

let add_btn = document.getElementById("add_btn");
add_btn.addEventListener("click", function (e) {
    let input_note = document.getElementById("exampleFormControlTextarea1");
    let input_title = document.getElementById("exampleFormControlInput1");
    let card = localStorage.getItem("card")
    if(input_note.value==""){
        alert("enter notes");
    }
    else if(input_title.value==""){
        alert("enter title");
    }
    else{
        if (card == null) {
            cardObj = [];
        }
        else {
            cardObj = JSON.parse(card);
        }
        let myobj = {
            title: input_title.value,
            note: input_note.value
        }
        cardObj.push(myobj);
        localStorage.setItem("card", JSON.stringify(cardObj));
        input_title.value = "";
        input_note.value = "";
        console.log(cardObj);
        showCards();
    }
    
})

function showCards() {
    let notes_card = document.getElementById("notes-card");
    let html = "";
    let card = localStorage.getItem("card");
    if (card == null) {
        cardObj = [];
    }
    else {
        cardObj = JSON.parse(card);
    }
    cardObj.forEach(function (element,index) {
        html += `<div class="card  my-3 mx-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.note}</p>
                            <button id="${index}" onClick="del_fun(this.id)" class="del-btn btn btn-primary">Delete</button>
                        </div>
                    </div>
             </div>`
    });
    if(cardObj.length!=0){
        notes_card.innerHTML = html;
    }
    else{
        notes_card.innerHTML = `Nothing to show! Use "ADD" to add notes `
    }
}

function del_fun(index){
    card = localStorage.getItem("card");
    if(card==null){
        cardObj = [];
    }
    else{
        cardObj = JSON.parse(card);
    }
    cardObj.splice(index,1);
    localStorage.setItem("card",JSON.stringify(cardObj));
    showCards();
}

search = document.getElementById("Idsearch");
search.addEventListener("input",function(){
    let i=0
    if(search.value!=""){
    document.getElementById("main_card").style.display="none";
    }
    let card_search = document.getElementsByClassName("card-text");
    Array.from(card_search).forEach(function(element){
        let txt = element.innerText.toLowerCase();
        if(txt.includes(search.value.toLowerCase())){
            element.parentElement.parentElement.style.display="block";
            i=1;
        }
        else{
            element.parentElement.parentElement.style.display="none";
        }
        
    })

})