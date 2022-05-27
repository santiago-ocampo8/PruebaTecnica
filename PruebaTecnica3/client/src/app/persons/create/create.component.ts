import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonModel } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service: PersonService,private router: Router) { }

  ngOnInit(): void {
  }

  loading = false;
  person: PersonModel = {
    id:0,
    name: "",
    last_name: "",
    identification: "",
    identification_type: "",
    date_of_birth: Date(),
    user: {}
  }


  async savePerson(){
    this.loading=true;

    await this.service.createPersons(this.person).subscribe(res => {

      if (res.error == true) {
        return
      }
      this.router.navigate(["/list"]);
      this.loading=false;
    });
  }
}
