import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  username: string = "";
  password: string = "";
  loading: boolean=false;

  async login() {
    this.loading=true;
    await this.service.login(this.username, this.password).subscribe(res => {

      if (res.error == true) {
        return
      }
      this.service.saveStorage("token", res.data.token);
      this.router.navigate(["/list"]);
      this.service.reload.emit();
      this.loading=false;
    });
  }

}
