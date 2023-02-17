import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{
  newUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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
  }

  get form() {
    return this.newUserForm;
  }

  handleSubmit() {
    this.newUserForm.patchValue({
      permission: {
        canReadUser: this.form.get('permission.canReadUser')?.value == false ? 0 : 1,
        canCreateUser: this.form.get('permission.canCreateUser')?.value == false ? 0 : 1,
        canUpdateUser: this.form.get('permission.canUpdateUser')?.value == false ? 0 : 1,
        canDeleteUser: this.form.get('permission.canDeleteUser')?.value == false ? 0 : 1,
        canSearchMachine: this.form.get('permission.canSearchMachine')?.value == false ? 0 : 1,
        canStartMachine: this.form.get('permission.canStartMachine')?.value == false ? 0 : 1,
        canStopMachine: this.form.get('permission.canStopMachine')?.value == false ? 0 : 1,
        canRestartMachine: this.form.get('permission.canRestartMachine')?.value == false ? 0 : 1,
        canCreateMachine: this.form.get('permission.canCreateMachine')?.value == false ? 0 : 1,
        canDestroyMachine: this.form.get('permission.canDestroyMachine')?.value == false ? 0 : 1,
      }
    })
    if (!this.newUserForm.valid) {
      alert('Form is invalid');
      return;
    }
    this.api.createNewUser(this.newUserForm.value).subscribe(
      res => {
        this.newUserForm.reset()
        alert('User created successfully');

      }, err => {
        if (err.status == 400) {
          alert('User with that email already exists')
        } else {
          alert('Server error')
        }
      }
    )
  }
}
