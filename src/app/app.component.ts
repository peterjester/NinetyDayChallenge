import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  email: string;
  password: string;

  constructor(db: AngularFirestore, public afAuth: AngularFireAuth) {
        // this.items = db.collection('items').valueChanges();
  }

  signup() {
    // this.afAuth. signup(this.email, this.password);
    // this.email = this.password = '';
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.email = this.password = '';    
  }

  logout() {
    this.afAuth.auth.signOut();
  }

title = 'Tour of Heroes';
}
