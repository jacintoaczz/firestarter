// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Since Firebase is authenticated with security rules on the backend, there's no issue
  // with putting the api key here.
  firebase: {
    apiKey: 'AIzaSyBCpx4EJU6CCikmLo5s3zXQbEjLbUt8zFI',
    authDomain: 'firestarter-6835a.firebaseapp.com',
    projectId: 'firestarter-6835a',
    storageBucket: 'firestarter-6835a.appspot.com',
    messagingSenderId: '788713194761',
    appId: '1:788713194761:web:6072391ef2a0576b977fd8',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
