let elForm = document.querySelector(".form");
let elInputName = elForm.querySelector(".name");
let elInputSurname = elForm.querySelector(".surname");
let elInputTel = elForm.querySelector(".tel");
let elContainer = document.querySelector(".container");
let elColumn = document.querySelector(".col-8");
let newList = document.createElement("ul");
let elDeleteButton = document.querySelector(".delete");
let elAlert = document.querySelector(".alert");
let elbtn = document.querySelector(".btn");
let contacts =JSON.parse(localStorage.getItem('contactsArray')) || [];


//Unordered list style
newList.classList.add("d-flex","flex-wrap","justify-content-between","rounded");
elInputTel.setAttribute("value", "+");


elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    

    //Get input values
    let elInputNameValue = elInputName.value.trim();
    let elInputSurnameValue = elInputSurname.value.trim();
    let elInputTelValue = elInputTel.value.trim();
    
    //Create object
    let obj = {
        id: contacts.length+1,
        name: elInputNameValue,
        surname: elInputSurnameValue,
        number: elInputTelValue,
    }

    //Check numbers to identify
    let num = contacts.findIndex(numbers => numbers.number == obj.number);
    
    if(obj.name !="" && num) {
        contacts.push(obj);
        window.location.reload();
    }else if (num == false) {
        elAlert.classList.remove("d-none");
    }
    
    createContacts(contacts);
    
    localStorage.setItem('contactsArray', JSON.stringify(contacts));
    
});


//Delete all contacts from list
elDeleteButton.addEventListener("click", function(ev) {
    ev.preventDefault();
    let deleteItems = localStorage.removeItem('contactsArray');
    window.location.reload();
});


function createContacts(arr){
    newList.innerHTML = "";
    arr.forEach(i => {
        
        let newItem = document.createElement("li");
        let newImage = document.createElement("img");
        let newTextContent = document.createElement("div");
        let newItemTop = document.createElement("div");
        let newParagraphName = document.createElement("p");
        let newParagraphSurName = document.createElement("p");
        let newTel = document.createElement("a");
        
        newItemTop.classList.add("d-flex", "justify-content-evenly");
        newParagraphName.classList.add("fw-semibold");
        newParagraphSurName.classList.add("fw-semibold");
        newTel.classList.add("text-decoration-none", "text-dark", "call");
        newTel.setAttribute("onclick", "window.open('tel:900300400');");
        

        //Contact names
        newSpanName = document.createElement("span", "fw-normal");
        newSpanName.classList.add("span-name", "d-inline");


        //Adding name to tag
        newParagraphName.appendChild(newSpanName);
        

        //Textcontent data
        newSpanName.textContent = "Name: " + i.name;
        newParagraphSurName.textContent = "Relationship: " + i.surname;
        newTel.textContent = "Tel: " + i.number;
        

        //Append to div element. In div (p and span)
        newTextContent.appendChild(newParagraphName);
        newTextContent.appendChild(newParagraphSurName);
        

        //Contact image styles
        newImage.src = "https://picsum.photos/50/50";
        newImage.style.height = "60px";
        newImage.classList.add("rounded-circle", "mt-2");
        

        //Append image to div. div = (image, p and span)
        newItemTop.appendChild(newImage); 
        newItemTop.appendChild(newTextContent);
        newItem.appendChild(newItemTop);
        newItem.appendChild(newTel);
        newItem.classList.add("contacts__item", "mb-3","mr-3", "rounded");
        newList.appendChild(newItem);
        newList.classList.add("list-unstyled");
        elColumn.appendChild(newList);
        
    })
    
}

createContacts(contacts);




