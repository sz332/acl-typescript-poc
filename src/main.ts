import { User, UserToken } from "./User"
import { Library } from "./library/Library";
import { Document } from "./library/Document";
import { SimpleEventBus } from "./events/SimpleEventBus";

let eventBus = new SimpleEventBus();
let library = new Library(eventBus);

let joker = new User('Joker');
let jokerToken = new UserToken(joker);

let harley = new User('Harley Quinn');
let harleyToken = new UserToken(harley);

let bane = new User('Bane');
let baneToken = new UserToken(bane);

let escapePlan = new Document('1', 'Escape from Arkham');
let capturePlan = new Document('2', 'Capture Batman');

library.addDocument(jokerToken, escapePlan);
library.addDocument(jokerToken, capturePlan);

try{
    library.getDocumentById(harleyToken, '1');
} catch (e){
    console.log("Harley was not able to access Joker's plan because she has no access right");
}

// library.grantAccess(user, firstBook);

// let book1 = library.getDocumentById(user,"1");

// console.log("first book = " + book1.toString());

// let book2 = library.getDocumentById(user, "2");

// console.log("second book = " + book2.toString()); 