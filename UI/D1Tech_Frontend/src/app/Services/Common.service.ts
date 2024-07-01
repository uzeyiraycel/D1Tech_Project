import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private modalSvc: NgbModal
  ) { }

  openModal(content: any, sz?: 'sm' | 'lg' | 'xl', location?: boolean, backdrop?: boolean | 'static') {
    return this.modalSvc.open(content, {
      backdrop: backdrop,
      size: sz,
      keyboard: false,
      centered: location ?? false
    });
  }

}
