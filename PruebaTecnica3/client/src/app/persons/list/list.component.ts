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
  page=0;
  type="Seleccione";
  query="";
  prevEnable=false;
  nextEnable=false;

  persons: PersonModel[] = []

  loading = false;
  loading2 = false;
  ngOnInit(): void {
    this.getPersons();
  }


  getPersons() {
    this.loading = true;

    console.log(this.page);
    console.log(this.query);
    console.log(this.type);

    this.service.getPersons({
      page: this.page,
      type: this.type,
      query: this.query,
    }).subscribe(res => {
      if (res.error == true) {
        alert(res.message);
        this.loading=false;
        return
      }
      console.log(res);
      this.page=res.current_page;
      this.nextEnable=res.next_page_url==null;
      this.prevEnable=res.prev_page_url==null;
      this.persons = res.data;
      this.loading = false;
    },err => {
      this.loading=false;
      alert("Ocurrió un error al hacer la petición");
    })
  }


  deletePerson(id:number) {
    this.loading2 = true;
    this.service.deletePerson(id).subscribe(res => {
      if (res.error == true) {
        alert(res.message);
        this.loading=false;
        return
      }
      this.persons = res.data;
      this.loading2 = false;
      this.getPersons();
    },err => {
      this.loading=false;
      alert("Ocurrió un error al hacer la petición");
    })
  }

  next(){
    this.page++;
    this.getPersons();
  }

  prev(){
    this.page--;
    this.getPersons();
  }
  search() {
    this.page = 1;
    this.getPersons();
  }
}
