import { User } from './core/User';
import { UserToken } from './core/UserToken';
import { Library } from './library/Library';
import { Document } from './library/Document';
import { SimpleEventBus } from './events/SimpleEventBus';
import { Permissions } from './acl/Permissions';

function accessResource(token: UserToken, library: Library, resourceId: string) {
  try {

    console.log('Trying to access document with id = ' + token.id().id());

    const resource = library.getResourceById(token, '1');

    console.log('Document access granted, title = ' + resource.toString());
  } catch (e) {
    console.log('Unable to access document: access not allowed');
  }
}

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

library.addResource(jokerToken, escapePlan);
library.addResource(jokerToken, captureBatmanPlan);

console.log("Harvey tries to access Joker's plan but fails...");

accessResource(harleyToken, library, '1');

console.log('Joker is giving grant to Harley to access the escape plan');

library.grantAccess(jokerToken, harley, escapePlan);

console.log('Now Harvey can access the plan');

accessResource(harleyToken, library, '1');

console.log('Now Bane wants to see the escape plan, but fails...');

accessResource(baneToken, library, '1');

console.log('Now Bane asks for the escape plan');

library.requestAccess(baneToken, escapePlan);

console.log('Joker checks the requests and accepts it');

let accessRequests = jokersPermissions.accessRequestList();
const accessRequestId = accessRequests[0].id;
jokersPermissions.acceptAccessRequest(accessRequestId);

accessResource(baneToken, library, '1');
