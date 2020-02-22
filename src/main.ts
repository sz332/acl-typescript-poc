import { User } from "./core/User"
import { UserToken } from "./core/UserToken";
import { Library } from "./library/Library";
import { Document } from "./library/Document";
import { SimpleEventBus } from "./events/SimpleEventBus";
import { Permissions } from "./acl/Permissions";

let eventBus = new SimpleEventBus();
let library = new Library(eventBus);

let joker = new User('Joker');
let jokerToken = new UserToken(joker);
let jokersPermissions = new Permissions(joker, eventBus);

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

console.log("Joker checks the requests and accepts it");

let accessRequests = jokersPermissions.accessRequestList();
const accessRequestId = accessRequests[0].id;
jokersPermissions.acceptAccessRequest(accessRequestId);

try{
    console.log('Trying to access document as Bane');

    const document = library.getDocumentById(baneToken, '1');

    console.log('Bane also accessed the document, title = ' + document.toString());
} catch (e){
    console.log('Bane was not able to access Joker\'s plan because he has no access right');
}
