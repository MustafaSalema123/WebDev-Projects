import { Injectable } from '@angular/core';
import {  CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';

import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangedGuard implements CanDeactivate<MemberEditComponent> {
  constructor(private confirmService: ConfirmService) { }

  canDeactivate(component: MemberEditComponent): Observable<boolean>
  {
    if (component.editForm?.dirty)
    {
      return this.confirmService.confirm();
      //return confirm("Are you sure you want to continue? Any unsaved chnaegs will be lost")
    }
    return of(true);
  //  return true;
  }
}
  

