import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Input() last: boolean;
  @Output() removing = new EventEmitter<Item>();

  constructor() { }

  ngOnInit(): void {}

  emitRemoving() {
    this.removing.emit(this.item);
  }
}
