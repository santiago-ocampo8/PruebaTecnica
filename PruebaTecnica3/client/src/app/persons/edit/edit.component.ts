import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonModel } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private service: PersonService, private _router: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getPerson();
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
  getPerson() {
    this.loading = true;
    this.service.getPerson(this._router.snapshot.params['id']).subscribe(res => {
     
      if (res.error == true) {
        alert(res.message);
        this.loading=false;
        return
      }
      this.person = res.data;
      this.loading = false;
    },err => {
      this.loading=false;
      alert("Ocurrió un error al hacer la petición");
    })
  }

  async updatePerson(){
    this.loading=true;

    await this.service.editPersons(this.person,this._router.snapshot.params['id']).subscribe(res => {

      if (res.error == true) {
        return
      }
      this.router.navigate(["/list"]);
      this.loading=false;
    },err => {
      this.loading=false;
      alert("Ocurrió un error al hacer la petición");
    });
  }
}

