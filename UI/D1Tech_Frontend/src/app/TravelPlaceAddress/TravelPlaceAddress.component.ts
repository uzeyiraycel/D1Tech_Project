import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelPlaceService } from '../Services/TravelPlace.service';
import { ToastrService } from 'ngx-toastr';
import { FormControlService } from '../Services/FormControl.service';
import { TravelPlaceAddresses } from '../Models/TravelPlaceAddresses';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-TravelPlaceAddress',
  templateUrl: './TravelPlaceAddress.component.html',
  styleUrls: ['./TravelPlaceAddress.component.css']
})
export class TravelPlaceAddressComponent implements OnInit {

  TravelPlaceId: string = '';

  form!: FormGroup;

  travelPlaceAddresses: TravelPlaceAddresses[] = [];

  travelPlaceAddress: TravelPlaceAddresses = <TravelPlaceAddresses>{
    Id: null,
    Address: null,
    TravelPlaceId: null
  };

  constructor(
    private fb: FormBuilder,
    private travelPlaceSvc: TravelPlaceService,
    private toastr: ToastrService,
    private formSvc: FormControlService,
    private ref: ChangeDetectorRef,
    private activeModal: NgbActiveModal
  ) { }

  async ngOnInit() {
    this.initForm();
    await this.getTravelPlaceAddresses(this.TravelPlaceId);
  }

  initForm() {
    this.form = this.fb.group({
      Address: [
        '',
        Validators.compose([Validators.required]),
      ],
      TravelPlaceId: [this.TravelPlaceId],
      Id: [null]
    });
  }

  async getTravelPlaceAddresses(id: string) {
    await this.travelPlaceSvc
      .getTravelPlaceAddresses(id)
      .then((res) => {
        this.travelPlaceAddresses = res;
        this.ref.detectChanges();
      })
      .catch((err) => {
        this.toastr.error('Veriler Alınamadı!', 'Başarısız');
      });
  }

  async savePlaceAddress(fg: FormGroup) {
    if (fg.invalid) {
      this.toastr.error('Adres Giriniz!', 'Zorunlu Alan');
      return;
    }
    let value = <TravelPlaceAddresses>fg.value;

    await this.travelPlaceSvc
      .savePlaceAddress(value)
      .then(async (res) => {
        debugger
        if (res != null) {
          this.toastr.success('Kayıt İşlemi Başarıyla Gerçekleştirildi', 'Başarılı');
          await this.getTravelPlaceAddresses(this.TravelPlaceId);
          this.form = this.formSvc.toForm(this.travelPlaceAddress);
          this.form.patchValue({ TravelPlaceId: this.TravelPlaceId });
        } else {
          this.toastr.error('Kayıt İşlemi Başarısız!', 'Başarısız');
        }
        this.ref.detectChanges();
      })
      .catch((err) => {
        this.toastr.error('Kayıt İşlemi Başarısız!', 'Başarısız');
      });
  }

  closeModal(value: boolean) {
    this.activeModal.close(value);
  }




  editTravelPlaceAddress(id: string | null) {
    if (id != undefined && id != null) {
      this.travelPlaceSvc
        .getTravelPlaceAddress(id)
        .then((res) => {
          this.travelPlaceAddress = res;
          this.form = this.formSvc.toExsistForm(
            this.travelPlaceAddress,
            this.form
          );
          this.ref.detectChanges();
        })
        .catch((err) => {
          this.toastr.error('Veri Alınamadı!', 'Başarısız');
        });
    }
  }



  deleteTravelPlaceAddress(id: string | null) {
    if (id != undefined && id != null) {
      this.travelPlaceSvc
        .deleteTravelPlaceAddress(id)
        .then(async (res) => {
          this.toastr.success('Silme İşlemi Başarıyla Gerçekleştirildi', 'Başarılı');
          await this.getTravelPlaceAddresses(this.TravelPlaceId);
          this.ref.detectChanges();
        })
        .catch((err) => {
          this.toastr.error('Silme İşlemi Yapılamadı!', 'Başarısız');
        });
    }
  }

}
