import { User } from "./User"
import { Library } from "./Library";
import { Document } from "./Document";

let user = new User('John Doe');
let library = new Library();

let firstBook = new Document('1', 'First book');
let secondBook = new Document('2', 'Second book');

library.addDocument(firstBook);
library.addDocument(secondBook);

library.grantAccess(user, firstBook);

let book1 = library.getDocumentById(user,"1");

console.log("first book = " + book1.toString());

let book2 = library.getDocumentById(user, "2");

console.log("second book = " + book2.toString());