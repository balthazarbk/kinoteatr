import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchInput: FormControl = new FormControl('', Validators.required);

  constructor(private router: Router) {}
  ngOnInit(): void {}
  searchByName() {
    if (this.searchInput.value) {
      this.router.navigate(['search', this.searchInput.value]);
    }
  }
}
