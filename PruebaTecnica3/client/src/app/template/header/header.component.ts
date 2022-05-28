import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logoutTimeOut } from 'src/app/config/auth';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: UserService, private router: Router) { }

  userLogged: boolean = false;
  time:any;

  ngOnInit(): void {
    this.showMenu();
    this.service.reload.subscribe(res => {
      this.showMenu();
      this.time=logoutTimeOut();
    });
  }


  logout() {
    this.service.logout().subscribe(res => {
      if (res.error == true) {
        alert(res.message)
        return
      }
     
      localStorage.clear();
      this.showMenu();
      clearTimeout(this.time);
      this.router.navigate(["/login"]);

    }, err => {
      alert("Ocurrió un error al hacer la petición");
    });
  }
  showMenu(): void {
    let token = this.service.getToken();
    if (token === null || token === undefined) {
      this.userLogged = false;
    } else {
      this.userLogged = true
    }
  }

}
