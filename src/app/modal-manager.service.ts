import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalManagerService {

  constructor() { }

  public modal: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  pushModal(data: any) {
    this.modal.next(data);
  }
}
