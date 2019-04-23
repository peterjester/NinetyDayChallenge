import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { FormControl } from '@angular/forms';
import { Goal } from '../hero';


@Component({
  selector: 'app-root',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css'] 
})


export class TestComponentComponent {
  items$: Observable<Goal[]>;
  sizeFilter$: BehaviorSubject<string|null>;
  favoriteColorControl = new FormControl('');

  filter() {
    console.log(this.favoriteColorControl.value);
    this.sizeFilter$.next(this.favoriteColorControl.value);

  }
  
  constructor(afs: AngularFirestore) {
    this.sizeFilter$ = new BehaviorSubject(null);
    this.items$ = combineLatest(
      this.sizeFilter$
    ).pipe(
      switchMap(([text]) => 
        afs.collection('goals', ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (text) { query = query.where('goal', '==', text) };
          return query;
        }).valueChanges()
      )
    );
  }

  clear() {
    this.favoriteColorControl.setValue('');
    this.filter();
  }

  
  
}