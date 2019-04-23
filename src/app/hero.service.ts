import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { FormControl } from '@angular/forms';
import { switchMap, filter } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { Goal } from './hero';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  items$: Observable<Goal[]>;
  sizeFilter$: BehaviorSubject<string|null>;
  goals : AngularFirestoreCollection<Goal>;
  private goalDoc: AngularFirestoreDocument<Goal>;


  constructor(afs: AngularFirestore) {

    this.goals = afs.collection<Goal>("goals");
    
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

  getHeroes(): Observable<Goal[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.items$;
    // return this.goals;
  }

  addGoal(goal) {
    this.goals.add(goal);
  }

  updateTask(id, update) {
    //Get the task document
    // this.goalDoc = this.afs.doc<Goal>(`${"goals"}/${id}`);
    // this.goalDoc.update(update);
  }


  
}
