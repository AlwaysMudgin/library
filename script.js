let myLibrary = [];
const container = document.querySelector(".cards-container");

// New book modal form
const newBookButton = document.querySelector("#add-book");
const newBookDialog = document.querySelector("#book-dialog");
newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
})

const newBookBackButton = document.querySelector("#new-book-back");
newBookBackButton.addEventListener("click", () => {
    newBookDialog.close();
})

const newBookForm = document.querySelector("#new-book-form");
newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newBookTitle = document.querySelector("#new-book-title");
    const newBookAuthor = document.querySelector("#new-book-author");
    const newBookPages = document.querySelector("#new-book-pages");
    const newBookStatus = document.querySelector("#new-book-status");

    let title = newBookTitle.value;
    let author = newBookAuthor.value;
    let pages = newBookPages.value;
    let status = newBookStatus.value;

    addBookToLibrary(title, author, pages, status);
    newBookDialog.close();
    displayAllBooks();
})

// Book object (class)
class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.id = crypto.randomUUID();
    }
}


// New book function
function addBookToLibrary(title, author, pages, status) {
    let book = new Book(title, author, pages, status);
    myLibrary.push(book);
}

// Display books function
function displayAllBooks() {
    container.replaceChildren();
    for (let i = 0; i < myLibrary.length; i++) {
        let bookID = myLibrary[i].id;
        
        const card = document.createElement("div");
        card.className = "card";

        const header = document.createElement("div");
        header.className = "card-header";

        const headerIcon = document.createElement("img");
        headerIcon.src = "book-open-blank-variant-outline.svg"
        headerIcon.alt = "book icon"
        headerIcon.className = "header-icon"

        const title = document.createElement("p");
        title.innerText = myLibrary[i].title;
        title.className = "title";

        const deleteIcon = document.createElement("img");
        deleteIcon.src = "close-circle-outline.svg";
        deleteIcon.alt = "delete icon";
        deleteIcon.className = "delete-icon";
        deleteIcon.setAttribute("data-id", bookID);
        deleteIcon.addEventListener("click", () => {
            let index = myLibrary.findIndex(object => object.id === bookID);
            myLibrary.splice(index, 1);
            displayAllBooks();
        })

        header.appendChild(headerIcon);
        header.appendChild(title);
        header.appendChild(deleteIcon);
        card.appendChild(header);

        const author = document.createElement("p");
        author.innerText = myLibrary[i].author;
        author.className = "author";
        card.appendChild(author);

        const pages = document.createElement("p");
        pages.innerText = `${myLibrary[i].pages} pages`;
        pages.className = "pages";
        card.appendChild(pages);

        const status = document.createElement("p");
        status.className = "status";
        status.setAttribute("data-id", bookID)
        if (myLibrary[i].status === "read") {
            status.innerText = "Read";
            status.id = "read"
        } else {
            status.innerText = "Unread";
            status.id = "unread"
        }
        status.addEventListener("click", () => {
            let index = myLibrary.findIndex(object => object.id === bookID);
            if (myLibrary[index].status === "read") {
                myLibrary[index].status = "unread";
            } else {
                myLibrary[index].status = "read";
            }
            displayAllBooks();
        })

        card.appendChild(status);
        container.appendChild(card);
    }
}