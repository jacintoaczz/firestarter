import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Directive({
  selector: '[googleSignin]',
})
export class GoogleSigninDirective {
  constructor(private _afAuth: AngularFireAuth) {}

  /* 
    We attach the onClick  event listener to any element that uses the directive, and handle the
    login appropiatedly.
  */
  @HostListener('click')
  onClick() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
