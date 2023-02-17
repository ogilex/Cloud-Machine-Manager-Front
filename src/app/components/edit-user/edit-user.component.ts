import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy{

  id!: number;
  sub: any;

  user: any;

  editUserForm!: FormGroup;

  constructor(
    public userService: UserService,
    private api: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    })

    this.editUserForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['default', [Validators.required]],
      permission: this.fb.group({
        canReadUser: [false],
        canCreateUser: [false],
        canUpdateUser: [false],
        canDeleteUser: [false],
        canSearchMachine: [false],
        canStartMachine: [false],
        canStopMachine: [false],
        canRestartMachine: [false],
        canCreateMachine: [false],
        canDestroyMachine: [false]
      })
    })

    this.api.getUserById(this.id).subscribe(res => {
      this.user = res;
      console.log(this.user);

      this.editUserForm.patchValue({
        name: res.name,
        surname: res.surname,
        email: res.email,
        permission: {
          canReadUser: res.permission.canReadUser == 1 ? true : false,
          canCreateUser: res.permission.canCreateUser == 1 ? true : false,
          canUpdateUser: res.permission.canUpdateUser == 1 ? true : false,
          canDeleteUser: res.permission.canDeleteUser == 1 ? true : false,
          canSearchMachine: res.permission.canSearchMachine == 1 ? true : false,
          canStartMachine: res.permission.canStartMachine == 1 ? true : false,
          canStopMachine: res.permission.canStopMachine == 1 ? true : false,
          canRestartMachine: res.permission.canRestartMachine == 1 ? true : false,
          canCreateMachine: res.permission.canCreateMachine == 1 ? true : false,
          canDestroyMachine: res.permission.canDestroyMachine == 1 ? true : false,
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleSubmit() {
    this.editUserForm.patchValue({
      permission: {
        canReadUser: this.editUserForm.get('permission.canReadUser')?.value == false ? 0 : 1,
        canCreateUser: this.editUserForm.get('permission.canCreateUser')?.value == false ? 0 : 1,
        canUpdateUser: this.editUserForm.get('permission.canUpdateUser')?.value == false ? 0 : 1,
        canDeleteUser: this.editUserForm.get('permission.canDeleteUser')?.value == false ? 0 : 1,
        canSearchMachine: this.editUserForm.get('permission.canSearchMachine')?.value == false ? 0 : 1,
        canStartMachine: this.editUserForm.get('permission.canStartMachine')?.value == false ? 0 : 1,
        canStopMachine: this.editUserForm.get('permission.canStopMachine')?.value == false ? 0 : 1,
        canRestartMachine: this.editUserForm.get('permission.canRestartMachine')?.value == false ? 0 : 1,
        canCreateMachine: this.editUserForm.get('permission.canCreateMachine')?.value == false ? 0 : 1,
        canDestroyMachine: this.editUserForm.get('permission.canDestroyMachine')?.value == false ? 0 : 1,
      }
    })

    if (!this.editUserForm.valid) {
      alert('Form is invalid');
      return;
    }

    this.api.editUser(this.user.id, this.editUserForm.value).subscribe(
      res => {
        alert('User editted successfully')
        this.router.navigate(['/']);
      }, err => {
        alert('Something went wrong')
      }
    )
  }

}
