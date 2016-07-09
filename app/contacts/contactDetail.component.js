/**
 * This component renders a read only view of the details for a single contact. 
 */
export const contactDetail = {
  bindings: { contact: '<' },

  template: `
    <div class="flex-h">
      <div class="details">
        <h3>{{$ctrl.contact.name.first}} {{$ctrl.contact.name.last}}</h3>
        <div><label>Company</label><div>{{$ctrl.contact.company}}</div></div>
        <div><label>Age</label><div>{{$ctrl.contact.age}}</div></div>
        <div><label>Phone</label><div>{{$ctrl.contact.phone}}</div></div>
        <div><label>Email</label><div>{{$ctrl.contact.email}}</div></div>
        <div class="flex-h">
          <label>Address</label>
          <div>{{$ctrl.contact.address.street}}<br>
                {{$ctrl.contact.address.city}}, {{$ctrl.contact.address.state}} {{$ctrl.contact.address.zip}}
          </div>
        </div>
      </div>
  
      <div class="flex nogrow">
        <img ng-src="{{$ctrl.contact.picture}}"/>
      </div>
    </div>
`
};
