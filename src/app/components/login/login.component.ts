import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username: string = '';
  password: string = '';

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleLogin() {
    this.api.login(
      {
        username: this.username,
        password: this.password
      }
    ).subscribe(
      (response) => {
        localStorage.setItem('jwt_token', response.jwt);
        this.userService.login(response.jwt);
        this.router.navigate(['/']);
      },
      (err) => {
        if (err.status == 401)
          alert('Bad credentials');
        else
          alert('Server error');
      }
    )
  }

}
