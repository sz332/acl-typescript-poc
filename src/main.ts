import { User, UserToken } from "./User"
import { Library } from "./library/Library";
import { Document } from "./library/Document";
import { SimpleEventBus } from "./events/SimpleEventBus";

let eventBus = new SimpleEventBus();
let library = new Library(eventBus);

let user = new User('John Doe');
let userToken = new UserToken(user);

let firstBook = new Document('1', 'First book');
let secondBook = new Document('2', 'Second book');

library.addDocument(userToken, firstBook);
library.addDocument(userToken, secondBook);

// library.grantAccess(user, firstBook);

// let book1 = library.getDocumentById(user,"1");

// console.log("first book = " + book1.toString());

// let book2 = library.getDocumentById(user, "2");

// console.log("second book = " + book2.toString()); 