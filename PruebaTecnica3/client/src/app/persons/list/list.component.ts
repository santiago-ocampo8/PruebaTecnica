import { Component, OnInit } from '@angular/core';
import { PersonModel } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private service: PersonService) { }

  person: PersonModel = {
    id:0,
    name: "",
    last_name: "",
    identification: "",
    identification_type: "",
    date_of_birth: Date(),
    user: {}
  }

  persons: PersonModel[] = []

  loading = false;
  loading2 = false;
  ngOnInit(): void {
    this.getPersons();
  }


  getPersons() {
    this.loading = true;
    this.service.getPersons().subscribe(res => {
      console.log(res);
      this.persons = res.data;
      this.loading = false;
    })
  }


  deletePerson(id:number) {
    this.loading2 = true;
    this.service.deletePerson(id).subscribe(res => {
      console.log(res);
      this.persons = res.data;
      this.loading2 = false;
      this.getPersons();
    })
  }
}
