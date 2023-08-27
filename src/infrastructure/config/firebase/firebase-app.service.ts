import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import firebaseConfig from './firebase-config';

@Injectable()
export class FirebaseApp {
  private firebaseApp: firebase.app.App;

  constructor() {
    // console.log('MIddleware... ', firebaseConfig.clientEmail);
    // console.log('PRIVATE KEY... ', { private: firebaseConfig.privateKey });
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert({ ...firebaseConfig }),
    });
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth();
  };

  // firestore = (): firebase.firestore.Firestore => {
  //     return this.firebaseApp.firestore();
  // }
}
