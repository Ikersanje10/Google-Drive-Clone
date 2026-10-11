import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-app-empty-state',
  styleUrl: './app-empty-state.scss',
  templateUrl: './app-empty-state.html',
})
export class AppEmptyState {

  icon = input();
  title = input();
  description = input();
}
