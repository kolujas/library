const tbody = document.querySelector("tbody");
const addBookBtn = document.querySelector(".add-book-btn");
const form = document.querySelector("form");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

class Library {
  constructor(myLibrary) {
    this.myLibrary = myLibrary;
  }

  addBookToLibrary(title, author, pages, read) {
    const nuevoLibro = new Book(title, author, pages, read);
    this.myLibrary.push(nuevoLibro);
  }

  showBooks() {
    tbody.innerHTML = "";
    this.myLibrary.forEach((book) => {
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
        cellRead.textContent = "not read";
      } else {
        cellRead.textContent = "Read";
      }

      tr.appendChild(cellRead);

      const cellDelete = document.createElement("td");
      tr.appendChild(cellDelete);

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "Delete book";

      cellDelete.appendChild(deleteBtn);

      const cellToggleRead = document.createElement("td");
      tr.appendChild(cellToggleRead);

      const toggleRead = document.createElement("input");
      toggleRead.classList.add("toggle-read-btn");
      toggleRead.type = "checkbox";

      cellToggleRead.appendChild(toggleRead);
    });
  }

  removeBookById(bookId) {
    this.myLibrary = this.myLibrary.filter((book) => book.id !== bookId);
  }

  toggleBookReadStatus(bookId) {
    const bookToToggle = this.myLibrary.find((book) => book.id === bookId);
    if (bookToToggle) {
      bookToToggle.toggleReadStatus();
    }
  }
}

const lib = new Library(myLibrary);

addBookBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTitle = titleInput.value;
  const newAuthor = authorInput.value;
  const newPages = pagesInput.value;
  const isRead = readInput.checked;

  lib.addBookToLibrary(newTitle, newAuthor, newPages, isRead);
  lib.showBooks();

  form.reset();
});

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const removeBook = e.target.closest("tr").dataset.id;

    lib.removeBookById(removeBook);
    lib.showBooks();
  } else if (e.target.classList.contains("toggle-read-btn")) {
    const changeBook = e.target.closest("tr").dataset.id;
    lib.toggleBookReadStatus(changeBook);
    lib.showBooks();
  }
});
