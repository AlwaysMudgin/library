const myLibrary = [];
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

// Book object
function Book(title, author, pages, status) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
    this.info = function() {
        return(`${this.title} by ${this.author}, ${pages} pages, ${status}`)
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
        const card = document.createElement("div");
        card.className = "card";

        const header = document.createElement("div");
        header.className = "card-header";

        const icon = document.createElement("img");
        icon.src = "book-open-blank-variant-outline.svg"
        icon.alt = "book icon"
        icon.className = "header-icon"

        const title = document.createElement("p");
        title.innerText = myLibrary[i].title;
        title.className = "title";

        header.appendChild(icon);
        header.appendChild(title);
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
        status.className = "status"
        if (myLibrary[i].status === "read") {
            status.innerText = "Read";
            status.id = "read"
        } else {
            status.innerText = "Unread";
            status.id = "unread"
        }
        card.appendChild(status);
        container.appendChild(card);
    }
}