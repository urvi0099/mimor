import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RolesService } from '../../services/roles.service';
import { USER_SUBROLE } from '../../shared/constants/mock';

@Component({
  selector: 'app-sub-role',
  templateUrl: './sub-role.page.html',
  styleUrls: ['./sub-role.page.scss'],
})
export class SubRolePage implements OnInit {

  public model: any = USER_SUBROLE;
  
  constructor(private navigation: NavigationService,
    private rolesService: RolesService) { }

  ngOnInit() {
  }

  public changeResidingStatus(): void {
    console.log('changed', this.model.user_status);
  }

  public back(): void {
    this.navigation.back();
  }

  public submit(): void {
    console.log('submit', this.model);
  }

}
