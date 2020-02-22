import { User } from "./core/User"
import { UserToken } from "./core/UserToken";
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
let captureBatmanPlan = new Document('2', 'Capture Batman');

library.addDocument(jokerToken, escapePlan);
library.addDocument(jokerToken, captureBatmanPlan);

try{
    console.log('Trying to access document as Harley');
    const document = library.getDocumentById(harleyToken, '1');
    console.log('Document accessed, title = ' + document.toString());
} catch (e){
    console.log('Harley was not able to access Joker\'s plan because she has no access right');
}

console.log('Giving grant to Harley to access the escape plan');
library.grantAccess(jokerToken, harley, escapePlan);

try{
    console.log('Trying to access document as Harley');
    const document = library.getDocumentById(harleyToken, '1');
    console.log('Document accessed, title = ' + document.toString());
} catch (e){
    console.log('Harley was not able to access Joker\'s plan because she has no access right');
}

try{
    console.log('Trying to access document as Bane');
    const document = library.getDocumentById(baneToken, '1');
    console.log('Document accessed, title = ' + document.toString());
} catch (e){
    console.log('Bane was not able to access Joker\'s plan because he has no access right');
}

console.log("Now Bane asks for the escape plan");

library.requestAccess(baneToken, escapePlan);



// library.grantAccess(user, firstBook);

// let book1 = library.getDocumentById(user,"1");

// console.log("first book = " + book1.toString());

// let book2 = library.getDocumentById(user, "2");

// console.log("second book = " + book2.toString()); 