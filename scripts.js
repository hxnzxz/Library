const myLibrary = [];


function book(title, author, id){
    if(!new.target){
        console.log("illegal call how did you do this");
    }
    this.title = title;
    this.author = author;
    this.id=id;
}
book.prototype.getTitle = function(){
    return this.title
}
book.prototype.getName = function(){
    return this.author
}
book.prototype.getID = function(){
    return this.id
}

function addBookToLibrary(title, author){
    var newBook = new book(title, author, self.crypto.randomUUID());
    myLibrary.push(newBook);
}

document.getElementById("bookForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("bookTitle");
    const author = document.getElementById("authorName");
    addBookToLibrary(title.value, author.value);
    title.value = "";
    author.value= "";
    console.log("done")
})

function refreshLibrary(){
    const table = document.getElementById("libraryBody");
    for (const book of myLibrary){
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        td1.textContent = book.getTitle();
        td2.textContent = book.getName();
        td3.textContent = book.getID();
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    }
}

document.getElementById("refreshLibrary").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("happened");
    refreshLibrary();
})

addBookToLibrary("Garfield", "Jim Davis");
addBookToLibrary("Diary of a Wimpy Kid", "Jeff Kinney");
refreshLibrary();