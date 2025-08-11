const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const libroGordo = new Book(
    "El señor de los anillos en el orto",
    "El gordo de mierda",
    200,
    false
  );

  myLibrary.push(libroGordo);
}
