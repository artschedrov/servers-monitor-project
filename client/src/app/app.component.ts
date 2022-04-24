import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from './enum/data-state.enum';
import { AppState } from './interface/app-state.interface';
import { CustomResponse } from './interface/custom-response.interface';
import { ServerService } from './service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'client';
  appState$!: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.appState$ = this.serverService.getServers()
    .pipe(
      map(response => {
        return { dataState: DataState.LOADED, appData: response}
      }), 
      startWith({ dataState: DataState.LOADING}), 
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR, error })
      }))
  }
}
