import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _show = new Subject<void>();
  show$ = this._show.asObservable();

  show() {
    this._show.next();
  }
}
