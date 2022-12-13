import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { API } from '../../shared/constants/api.constants';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.page.html',
  styleUrls: ['./agent-profile.page.scss'],
})
export class AgentProfilePage implements OnInit {

  public userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    company: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.minLength(6)]),
  });

  public buttonText: string = BUTTONS.save;
  public user;
  public lastApartment;
  public pageLoading = true;

  constructor(private router: Router,
    public route: ActivatedRoute,
    private rolesService: RolesService,
    private apiService: ApiService,
    private alert: AlertService) {
    console.log('resident profile constructor')
  }

  ngOnInit() {
    this.getProfile();
  }

  public getProfile() {
    this.apiService.get(API.client.getProfile).subscribe((response) => {
      if (response.status === true) {
        this.user = response.user;
        console.log(this.user);
        this.userForm.patchValue(this.user);
        this.pageLoading = false;
        return;
      }
      this.alert.show(response.message || ERROR.internal)
    })
  }

  public save() {
    let user = { ...this.user, ...this.userForm.value };
    // if (this.saving) {
    //   return false;
    // }
    // this.saving = true;
    this.pageLoading = true;
    this.apiService.put(API.client.saveProfile, user)
      .subscribe((response) => {
        if (response.status) {
          this.router.navigateByUrl('agent/dashboard');
          return;
        }
        this.alert.show(response.message || ERROR.internal)
        // this.saving = false;
        this.pageLoading = false;
      }, () => {
        // this.saving = false;
        this.pageLoading = false;
      });
  }


  public cancel(): void {
    this.router.navigateByUrl('agent/dashboard');
  }

}
