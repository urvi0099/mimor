import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalController } from '@ionic/angular';

import { TermsModal } from '../../shared/modals/terms/terms.component';
import { PrivacyModal } from '../../shared/modals/privacy/privacy.component';
import { ApiService } from '../../services/api.service';
import { NavigationService } from '../../services/navigation.service';
import { API } from '../../shared/constants/api.constants';
import { AlertService } from '../../services/alert.service';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage implements OnInit {
  public role = '';
  public isCodeGenerated = false;
  public pageLoading = false;
  public siteKey = '6LdPZK8UAAAAAPZtJ0EL36Oau1iJS1dG2pMTlYIW';

  public registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    terms: new FormControl(false, Validators.required),
    recaptcha: new FormControl('', Validators.required),
  });

  public patterns = {
    // '0': { pattern: new RegExp('\[0-9\]')}
    // '0': { pattern: /^6104[\d]{8}$/ },
    // '1': { pattern: new RegExp('^610[^4]{1}[\d]{8}$')},
    // '2': { pattern: new RegExp('^61[^0]{1}[\d]{7}$')},
    // '3': { pattern: new RegExp('^04[\d]{8}$')},
    // '4': { pattern: new RegExp('^0[^4]{1}[\d]{8}$')},
    // '5': { pattern: new RegExp('^[^06]{1}[\d]{7}$')},
    // '6': { pattern: new RegExp('^1[2-9]{1}\d{2}[2-9]{1}\d{2}\d{4}$')},
  };
  public aMasks = [
    {
      // name: 'mask#1 - mob 1: 61 04xx xxx xxx',
      reg: /^6104[\d]{8}$/,
      mask: '99 9999 999 999',
    },
    {
      // name: 'mask#2 - house 1: 61 0[^4] xxxx xxxx',
      reg: /^610[^4]{1}[\d]{8}$/,
      mask: '99 99 9999 9999',
    },
    {
      // name: 'mask#3 - house 2: 61 [^0]xxx xxxx',
      reg: /^61[^0]{1}[\d]{7}$/,
      mask: '99 9999 9999',
    },
    {
      // name: 'mask#4 - mob 2: 04xx xxx xxx',
      reg: /^04[\d]{8}$/,
      mask: '9999 999 999',
    },
    {
      // name: 'mask#5 - house 3: 0[^4] xxxx xxxx',
      reg: /^0[^4]{1}[\d]{8}$/,
      mask: '99 9999 9999',
    },
    {
      reg: /^[^06]{1}[\d]{7}$/,
      mask: '9999 9999',
    },
    {
      // name: 'mask#6 - house 4: [^06]{1}xxx xxxx',
      reg: /^1[2-9]{1}\d{2}[2-9]{1}\d{2}\d{4}$/,
      mask: '9 999 999 9999',
    },
  ];

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private navigation: NavigationService,
    public dialog: MatDialog,
    public modalController: ModalController,
    public alert: AlertService
  ) {
    console.log('register constructor');
  }

  ngOnInit() {
    this.role = this.route.snapshot.url[0].path.split('-')[1];
    if (this.role !== 'resident') {
      this.registerForm.addControl(
        'company',
        new FormControl('', Validators.required)
      );
    } else
      this.registerForm.addControl(
        'verCode',
        new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ])
      );
    if (this.role !== 'agent') {
      this.registerForm.addControl(
        'phone',
        new FormControl('', [Validators.required])
      );
    }
  }

  public register(): void {
    if (this.role === 'manager') {
      this.registerForm.value.flag = false;
      this.registerForm.value.existingEmail = false;
      delete this.registerForm.value.confirm;
      console.log('register', this.registerForm.value, this.registerForm);
      this.apiService
        .post(API.guest.register, this.registerForm.value)
        .subscribe((res) => {
          console.log(res);
          if (!res.status && res.message) {
            this.alert.show(res.message);
          }
          if (res.status) {
            this.router.navigateByUrl('/manager/buildings');
          }
        });
    } else if (this.role === 'resident') {
      this.apiService
        .post(API.guest.tenantRegister, this.registerForm.value)
        .subscribe((res) => {
          console.log(res);
          if (!res.status && res.message) {
            this.alert.show(res.message);
          }
          if (res.status) {
            this.router.navigateByUrl('/resident/select');
          }
        });
    } else {
      delete this.registerForm.value.confirm;
      this.registerForm.value.existingEmail = false;
      this.registerForm.value.agent = true;
      this.apiService
        .post(API.guest.register, this.registerForm.value)
        .subscribe((res) => {
          console.log(res);
          if (!res.status && res.message) {
            this.alert.show(res.message);
          }
          if (res.status) {
            this.router.navigateByUrl('/agent/dashboard');
          }
        });
    }
  }

  public genVerCode() {
    if (!this.isCodeGenerated) {
      let verifyPhone = this.registerForm.value.phone.replace(/\s+/g, '');
      console.log(verifyPhone);
      this.pageLoading = true;
      this.apiService
        .post(API.guest.getVerifyCode, {
          phone: verifyPhone,
        })
        .subscribe(
          (response) => {
            if (!response.status) {
              this.alert.show(response.message);
              this.pageLoading = false;
              return;
            }
            this.isCodeGenerated = true;
            this.alert.show(
              'An SMS code has been sent to your phone.' +
                (response.message || ''),
              'Success'
            );
            this.pageLoading = false;
            // this.showSendCodeAgain = true;
            return;
          },
          () => {
            this.pageLoading = false;
            this.alert.show(ERROR.internal);
            return;
          }
        );
      return;
    }
  }

  public back(): void {
    this.navigation.back();
  }

  public handleLoad() {}
  public handleReset() {}
  public handleExpire() {}
  public handdleSuccess(e) {}

  public enterKey(event): boolean {
    let charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  async presentModal(type) {
    const modal = await this.modalController.create({
      component: type === 'terms' ? TermsModal : PrivacyModal,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  public dismiss() {
    console.log('dismiss');
  }
}
