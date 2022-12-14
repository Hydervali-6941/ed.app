import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salary-settings',
  templateUrl: './salary-settings.component.html',
  styleUrls: ['./salary-settings.component.css'],
})
export class SalarySettingsComponent implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  constructor() {}

  ngOnInit(): void {}
}
