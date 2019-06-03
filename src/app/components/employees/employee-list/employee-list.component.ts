import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../shared/employee.model';
import { EmployeeService } from './../../../shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];
  constructor(private employeeService: EmployeeService,
              private tostr: ToastrService) { }

  ngOnInit() {
    const x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        // tslint:disable-next-line:no-string-literal
        y['$key'] = element.key;
        this.employeeList.push(y as Employee);
      });
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.employeeService.deleteEmployee(key);
      this.tostr.warning('Deleted Successfully', 'Employee register');
    }
  }
}
