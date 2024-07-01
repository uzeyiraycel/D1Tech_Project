import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  formData: any[] = [];

  constructor() { }

  toForm(model: any): FormGroup {
    const group: any = {};
    Object.keys(model).forEach((key: string) => {
      if (key != null && key != undefined && key != '') {
        group[key] = new FormControl(
          model[key] != undefined && model[key] != null ? model[key] : null,
          model[key] != undefined && model[key] != null
            ? { validators: [Validators.required] }
            : null
        );
      }
    });
    return new FormGroup(group);
  }

  toExsistForm(model: any, group: FormGroup): FormGroup {
    try {
      Object.keys(model).forEach((key: string) => {
        try {
          if (key != null && key != undefined && key != '') {
            if (
              group.controls[key] != undefined &&
              group.controls[key] != null
            ) {
              group.controls[key].patchValue(model[key]);
            } else {
              group.addControl(key, new FormControl(model[key]));
            }
          }
        } catch (error) {
          console.log(`Field Error: ${key}`, error);
        }
      });
    } catch (error) {
      console.log('Main Error: ', error);
    }
    return group;
  }

}
