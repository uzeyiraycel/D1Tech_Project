import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../Services/Common.service';
import { User } from '../Models/User';
import { AuthenticationService } from '../Services/Authentication.service';
import { RegisterComponent } from '../Register/Register.component';

@Component({
  selector: 'app-LoginProcess',
  templateUrl: './LoginProcess.component.html',
  styleUrls: ['./LoginProcess.component.css']
})
export class LoginProcessComponent implements OnInit {

  form!: FormGroup;

  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private ref: ChangeDetectorRef,
    private commonSvc: CommonService,
    private authSvc: AuthenticationService
  ) { }

  async ngOnInit() {
    await this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      Username: [
        '',
        Validators.compose([Validators.required]),
      ],
      Password: [
        '',
        Validators.compose([Validators.required]),
      ],
      Id: [null]
    });
  }

  async onSubmit(fg: FormGroup) {
    if (fg.invalid) {
      this.toastr.error('Kullanıcı Adı ve Şifrenizi Giriniz!', 'Zorunlu Alan');
      return;
    }
    let value = <User>fg.value;

    await this.authSvc
      .login(value)
      .then(async (res) => {
        this.toastr.success('Giriş İşlemi Başarıyla Gerçekleştirildi', 'Başarılı');
        localStorage.setItem('token', res.token);
        this.router.navigate(['/travel-places']);
        this.ref.detectChanges();
      })
      .catch((err) => {
        this.toastr.error('Giriş İşlemi Başarısız!', 'Başarısız');
      });
  }

  Register() {
    const mdRef = this.commonSvc.openModal(
      RegisterComponent,
      'lg'
    );
    mdRef.result.then(async (result) => {
      debugger
      if (result) {
        this.ref.detectChanges();
      }
    });
  }

}
