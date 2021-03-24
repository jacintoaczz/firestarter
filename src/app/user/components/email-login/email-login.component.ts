import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  loginForm!: FormGroup;

  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;

  serverMessage: string = '';

  constructor(
    private _afAuth: AngularFireAuth,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', []],
    });
  }

  changeType(value: 'login' | 'signup' | 'reset') {
    this.type = value;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  /* Getters for the form controls. 
    Like this we reduce the logic on the template */
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get passwordConfirm() {
    return this.loginForm.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') return true;

    return this.password?.value === this.passwordConfirm?.value;
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        await this._afAuth.signInWithEmailAndPassword(email, password);
      }

      if (this.isSignup) {
        await this._afAuth.createUserWithEmailAndPassword(email, password);
      }

      if (this.isLogin) {
        await this._afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your email.';
      }
    } catch (error) {
      this.serverMessage = error;
    }

    this.loading = false;
  }
}
