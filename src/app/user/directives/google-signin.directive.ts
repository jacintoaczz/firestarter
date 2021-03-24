import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Directive({
  selector: '[googleSignin]',
})
export class GoogleSigninDirective {
  constructor(private _afAuth: AngularFireAuth) {}

  @HostListener('click')
  onClick() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
