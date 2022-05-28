import { Component, OnInit } from '@angular/core';
import { PersonModel } from 'src/app/models/person.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getPerson();
  }

  person: PersonModel = {
    id:0,
    name: "",
    last_name: "",
    identification: "",
    identification_type: "",
    date_of_birth: Date(),
    user: {}
  }


  getPerson() {
    this.service.me().subscribe(res => {
      this.person = res.data;
    })
  }
  
}
