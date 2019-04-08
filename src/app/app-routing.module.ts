import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandComponent } from './land/land.component';


const routes: Routes = [
  { path: '', component: LandComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
