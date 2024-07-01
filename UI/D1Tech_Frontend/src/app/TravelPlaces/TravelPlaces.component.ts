import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelPlace } from '../Models/TravelPlace';
import { TravelPlaceService } from '../Services/TravelPlace.service';
import { ToastrService } from 'ngx-toastr';
import { FormControlService } from '../Services/FormControl.service';
import { CommonService } from '../Services/Common.service';
import { TravelPlaceAddressComponent } from '../TravelPlaceAddress/TravelPlaceAddress.component';

@Component({
  selector: 'app-TravelPlaces',
  templateUrl: './TravelPlaces.component.html',
  styleUrls: ['./TravelPlaces.component.css']
})
export class TravelPlacesComponent implements OnInit {

  form!: FormGroup;

  travelPlace: TravelPlace = <TravelPlace>{
    Id: null,
    Name: null,
  };

  travelPlaces: TravelPlace[] = [];



  constructor(
    private fb: FormBuilder,
    private travelPlaceSvc: TravelPlaceService,
    private toastr: ToastrService,
    private formSvc: FormControlService,
    private ref: ChangeDetectorRef,
    private commonSvc: CommonService
  ) { }
  async ngOnInit() {
    this.initForm();
    await this.getTravelPlaces();
  }

  initForm() {
    this.form = this.fb.group({
      Name: [
        '',
        Validators.compose([Validators.required]),
      ],
      Id: [null]
    });
  }

  async getTravelPlaces() {
    await this.travelPlaceSvc
      .getTravelPlaces()
      .then((res) => {
        this.travelPlaces = res;
        this.ref.detectChanges();
      })
      .catch((err) => {
      });
  }

  async saveTravel(fg: FormGroup) {
    if (fg.invalid) {
      this.toastr.error('Gezilecek Yer Giriniz!', 'Zorunlu Alan');
      return;
    }
    let value = <TravelPlace>fg.value;

    await this.travelPlaceSvc
      .saveTravel(value)
      .then(async (res) => {
        if (res != null) {
          this.toastr.success('Kayıt İşlemi Başarıyla Gerçekleştirildi', 'Başarılı');
          await this.getTravelPlaces();
          this.form = this.formSvc.toForm(this.travelPlace);
        } else {
          this.toastr.error('Kayıt İşlemi Başarısız!', 'Başarısız');
        }
        this.ref.detectChanges();
      })
      .catch((err) => {
        this.toastr.error('Kayıt İşlemi Başarısız!', 'Başarısız');
      });
  }



  editTravelPlace(travelPlaceId: string | null) {
    if (travelPlaceId != undefined && travelPlaceId != null) {
      this.travelPlaceSvc
        .getTravel(travelPlaceId)
        .then((res) => {
          this.travelPlace = res;
          this.form = this.formSvc.toExsistForm(
            this.travelPlace,
            this.form
          );
          this.ref.detectChanges();
        })
        .catch((err) => {
          this.toastr.error('Veri Alınamadı!', 'Başarısız');
        });
    }
  }

  deleteTravelPlace(id: string | null) {
    if (id != undefined && id != null) {
      this.travelPlaceSvc
        .deleteTravelPlace(id)
        .then((res) => {
          this.toastr.success('Silme İşlemi Başarıyla Gerçekleştirildi', 'Başarılı');
          this.getTravelPlaces();
          this.ref.detectChanges();
        })
        .catch((err) => {
          this.toastr.error('Silme İşlemi Yapılamadı!', 'Başarısız');
        });
    }
  }

  AddressList(id: string | null) {
    if (id != undefined && id != null) {
      const mdRef = this.commonSvc.openModal(
        TravelPlaceAddressComponent,
        'lg'
      );
      mdRef.componentInstance.TravelPlaceId = id;
      mdRef.result.then(async (result) => {
        if (result) {
          this.getTravelPlaces();
          this.ref.detectChanges();
        }
      });
    }
  }

}
