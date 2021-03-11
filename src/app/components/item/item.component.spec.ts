import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { Item } from 'src/app/models/item';
import { Component } from '@angular/core';

xdescribe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

describe('ItemComponent with Parent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostComponent, ItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the correct text', () => {
    expect(fixture.nativeElement.querySelector('h3').innerHTML).toEqual('Film title');
  });

  @Component({
    selector: 'app-host',
    template: '<app-item [item]="item"></app-item>'
  })
  class HostComponent {
    // tslint:disable-next-line: max-line-length
    item: Item = { id: 1, name: 'Film title', year: 2010, description: 'Lorem ipsum, desc.', price: 199, imageUrl: 'Url av en film', categories: [ { id: 76, name: 'Action' } ]};
  }
});
