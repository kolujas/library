let myLibrary = [];
const tbody = document.querySelector("tbody");
const addBookBtn = document.querySelector(".add-book-btn");
const form = document.querySelector("form");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

// Valor

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const nuevoLibro = new Book(title, author, pages, read);

  myLibrary.push(nuevoLibro);
}

function showBooks(array) {
  tbody.innerHTML = "";
  array.forEach((book) => {
    console.log(book);
    const tr = document.createElement("tr");
    tbody.appendChild(tr);
    tr.dataset.id = book.id;

    const cellTitle = document.createElement("td");
    cellTitle.textContent = book.title;
    tr.appendChild(cellTitle);

    const cellAuthor = document.createElement("td");
    cellAuthor.textContent = book.author;
    tr.appendChild(cellAuthor);

    const cellPages = document.createElement("td");
    cellPages.textContent = book.pages;
    tr.appendChild(cellPages);

    const cellRead = document.createElement("td");
    cellRead.textContent = book.read;

    if (book.read) {
      cellRead.textContent = "Libro leído";
    } else {
      cellRead.textContent = "Nadie leyó esta poronga";
    }

    tr.appendChild(cellRead);

    const cellDelete = document.createElement("td");
    tr.appendChild(cellDelete);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Eliminar poronga";

    cellDelete.appendChild(deleteBtn);

    const cellToggleRead = document.createElement("td");
    tr.appendChild(cellToggleRead);

    const toggleRead = document.createElement("input");
    toggleRead.classList.add("toggle-read-btn");
    toggleRead.type = "checkbox";

    cellToggleRead.appendChild(toggleRead);
  });
}

addBookBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTitle = titleInput.value;
  const newAuthor = authorInput.value;
  const newPages = pagesInput.value;
  const isRead = readInput.checked;

  addBookToLibrary(newTitle, newAuthor, newPages, isRead);
  showBooks(myLibrary);

  form.reset();
});

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const removeBook = e.target.closest("tr").dataset.id;

    myLibrary = myLibrary.filter((book) => book.id !== removeBook);
    showBooks(myLibrary);
  } else if (e.target.classList.contains("toggle-read-btn")) {
    const changeBook = e.target.closest("tr").dataset.id;
    const changeBookStatus = myLibrary.find((book) => book.id == changeBook);
    changeBookStatus.toggleReadStatus();
    showBooks(myLibrary);
  }
});

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};
