"use strict";
/**
 * This component renders a read only view of the details for a single contact.
 */
exports.contactDetail = {
    bindings: { contact: '<' },
    template: "\n    <div class=\"flex-h\">\n      <div class=\"details\">\n        <h3>{{$ctrl.contact.name.first}} {{$ctrl.contact.name.last}}</h3>\n        <div><label>Company</label><div>{{$ctrl.contact.company}}</div></div>\n        <div><label>Age</label><div>{{$ctrl.contact.age}}</div></div>\n        <div><label>Phone</label><div>{{$ctrl.contact.phone}}</div></div>\n        <div><label>Email</label><div>{{$ctrl.contact.email}}</div></div>\n        <div class=\"flex-h\">\n          <label>Address</label>\n          <div>{{$ctrl.contact.address.street}}<br>\n                {{$ctrl.contact.address.city}}, {{$ctrl.contact.address.state}} {{$ctrl.contact.address.zip}}\n          </div>\n        </div>\n      </div>\n  \n      <div class=\"flex nogrow\">\n        <img ng-src=\"{{$ctrl.contact.picture}}\"/>\n      </div>\n    </div>\n"
};
//# sourceMappingURL=contactDetail.component.js.map