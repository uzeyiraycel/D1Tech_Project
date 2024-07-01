import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../Models/User';
import { AuthenticationService } from '../Services/Authentication.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private ref: ChangeDetectorRef,
    private activeModal: NgbActiveModal,
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

  closeModal(value: boolean) {
    this.activeModal.close(value);
  }

  register(fg: FormGroup) {
    debugger
    if (fg.invalid) {
      this.toastr.error('Kullanıcı Adı ve Şifrenizi Giriniz!', 'Zorunlu Alan');
      return;
    }
    let value = <User>fg.value;

    this.authSvc
      .register(value)
      .then((res) => {
        debugger
        if (res != null) {
          this.toastr.success('Kayıt İşlemi Başarıyla Gerçekleştirildi.Giriş Yapınız', 'Başarılı');
          this.closeModal(true);
        } else {
          this.toastr.error('Kayıt İşlemi Başarısız!', 'Başarısız');
        }
        this.ref.detectChanges();
      })
      .catch((err) => {
        this.toastr.error('Kayıt İşlemi Başarısız!', 'Başarısız');
      });
  }

}
