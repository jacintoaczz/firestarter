import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SnackService } from '@app/services/snack.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _afAuth: AngularFireAuth, private _snack: SnackService) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = await this._afAuth.currentUser;
    // We convert the value into a boolean.
    const isLoggedIn = !!user;

    if (!isLoggedIn) {
      this._snack.authError();
    }

    return isLoggedIn;
  }
}
