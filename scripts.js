const myLibrary = [];

const dialog = document.querySelector("dialog");
const openDialog = document.getElementById("openDialog");
const closeDialog = document.getElementById("closeDialog");

function book(title, author, id, status){
    if(!new.target){
        console.log("illegal call how did you do this");
    }
    this.title = title;
    this.author = author;
    this.id=id;
    this.status = status;
};
book.prototype.getTitle = function(){
    return this.title
};
book.prototype.getName = function(){
    return this.author
};
book.prototype.getID = function(){
    return this.id
};
book.prototype.getStatus = function(){
    return this.status
};
book.prototype.setStatus = function(newStatus){
    this.status = newStatus
};

function addBookToLibrary(title, author, status){
    var newBook = new book(title, author, self.crypto.randomUUID(), status);
    myLibrary.push(newBook);
};

document.getElementById("bookForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("bookTitle");
    const author = document.getElementById("authorName");
    const status = document.getElementById("status");
    addBookToLibrary(title.value, author.value, status.value);
    title.value = "";
    author.value= "";
    status.value="Not Read";
    closeDialogWindow();
});

function refreshLibrary(){
    const table = document.getElementById("libraryBody");
    table.innerHTML="";
    for (const book of myLibrary){
        const tr = document.createElement("tr");
        tr.classList.add("customRow")
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");
        const td6 = document.createElement("td");;

        const changeStatus = document.createElement("button");
        const deleteButton = document.createElement("button");

        td1.textContent = book.getTitle();
        td2.textContent = book.getName();
        td3.textContent = book.getID();
        td4.textContent = book.getStatus();

        changeStatus.classList.add("rowButton");
        deleteButton.classList.add("rowButton");

        changeStatus.textContent = "Change";
        deleteButton.textContent = "Delete"
        attatchUpdateStatus(changeStatus, book.getID());
        attatchDeleteBook(deleteButton, book.getID());

        td5.appendChild(changeStatus);
        td6.appendChild(deleteButton);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        table.appendChild(tr);
    }
};

function attatchUpdateStatus(button, ID){
    button.addEventListener("click", (e) => {
        for(let x = 0; x < myLibrary.length; x++){
            if(myLibrary[x].getID() == ID){
                const curStatus = myLibrary[x].getStatus();
                if(curStatus == "Not Read"){
                    myLibrary[x].setStatus("Reading");
                }else if(curStatus == "Reading"){
                    myLibrary[x].setStatus("Finished");
                }else{
                    myLibrary[x].setStatus("Not Read");
                }
                break;
            }
        }
        refreshLibrary();
    })
}

function attatchDeleteBook(button, ID){
    button.addEventListener("click", (e) => {
        for(let x = 0; x < myLibrary.length; x++){
            if(myLibrary[x].getID() == ID){
                myLibrary.splice(x,1);
                break;
            }
        }
        refreshLibrary();
    })
}

function closeDialogWindow(){
    dialog.close();
}

document.getElementById("refreshLibrary").addEventListener("click", (e) => {
    e.preventDefault();
    refreshLibrary();
});

openDialog.addEventListener("click", (e) => {
    dialog.showModal();
});

closeDialog.addEventListener("click", closeDialogWindow);

addBookToLibrary("Garfield", "Jim Davis", "Finished");
addBookToLibrary("Diary of a Wimpy Kid", "Jeff Kinney", "Reading");
refreshLibrary();   