import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {

  machineName: string = '';

  constructor(
    private api: ApiService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

  createMachine() {
    if (this.machineName.trim().length === 0) {
      alert('Machine name is required');
      return;
    }
    this.api.createMachine({ name: this.machineName.trim() }).subscribe(
      (res) => {
        alert('Machine created successfully');
      }
    );
  }

}
