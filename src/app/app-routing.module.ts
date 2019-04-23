import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { TestComponentComponent } from './test-component/test-component.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'test-component', component: TestComponentComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}