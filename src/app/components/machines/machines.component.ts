import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Machine } from 'src/models';
import { ApiService } from 'src/services/api.service';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  datePipe = new DatePipe('en-US');

  machines: Machine[] = []
  scheduleDate!: string;

  // search filters
  machineNameFilter: string = '';
  statusStopped: boolean = false;
  statusRunning: boolean = false;
  dateFrom!: string;
  dateTo!: string;

  constructor(
    private api: ApiService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.api.getAllMachines().subscribe(
      (data: Machine[]) => {
        this.machines = data
      }
    )
  }

  search() {
    if ((this.dateFrom && !this.dateTo) || (!this.dateFrom && this.dateTo)) {
      alert('Please select both date filters or none.');
      return;
    }

    this.api.searchMachines(
      this.machineNameFilter, 
      this.statusStopped, 
      this.statusRunning, 
      this.datePipe.transform(this.dateFrom, 'dd-MM-yyyy'), 
      this.datePipe.transform(this.dateTo, 'dd-MM-yyyy')
    ).subscribe(
      (data: Machine[]) => {
        this.machines = data
      }
    )
  }

  startMachine(id: number) {
    this.api.startMachine(id).subscribe(
      () => {
        alert('Machine started');
        this.api.getAllMachines().subscribe(
          (data: Machine[]) => {
            this.machines = data
            setTimeout(() => {
              this.api.getAllMachines().subscribe(
                (data: Machine[]) => {
                  this.machines = data
                }
              )
            }, 15000);
          }
        )
      }
    )
  }

  stopMachine(id: number) {
    this.api.stopMachine(id).subscribe(
      () => {
        alert('Machine stopped');
        this.api.getAllMachines().subscribe(
          (data: Machine[]) => {
            this.machines = data
            setTimeout(() => {
              this.api.getAllMachines().subscribe(
                (data: Machine[]) => {
                  this.machines = data
                }
              )
            }, 15000);
          }
        )
      }
    )
  }

  restartMachine(id: number) {
    this.api.restartMachine(id).subscribe(
      () => {
        alert('Machine restarted');
        this.api.getAllMachines().subscribe(
          (data: Machine[]) => {
            this.machines = data
            setTimeout(() => {
              this.api.getAllMachines().subscribe(
                (data: Machine[]) => {
                  this.machines = data
                }
              )
            }, 30000);
          }
        )
      }
    )
  }

  scheduleStartMachine(id: number) {
    if (!this.scheduleDate) {
      alert('Please select a date');
      return;
    }
    this.api.scheduleStartMachine(id, this.scheduleDate.replace('T', ' ')).subscribe(
      () => {
        alert('Machine start scheduled');
      }
    )
  }

  scheduleStopMachine(id: number) {
    if (!this.scheduleDate) {
      alert('Please select a date');
      return;
    }
    this.api.scheduleStopMachine(id, this.scheduleDate.replace('T', ' ')).subscribe(
      () => {
        alert('Machine stop scheduled');
      }
    )
  }

  scheduleRestartMachine(id: number) {
    if (!this.scheduleDate) {
      alert('Please select a date');
      return;
    }
    this.api.scheduleRestartMachine(id, this.scheduleDate.replace('T', ' ')).subscribe(
      () => {
        alert('Machine restart scheduled');
      }
    )
  }

  destroyMachine(id: number) {
    this.api.destroyMachine(id).subscribe(
      () => {
        alert('Machine destroyed');
        this.api.getAllMachines().subscribe(
          (data: Machine[]) => {
            this.machines = data
          }
        )
      }
    )
  }
}
