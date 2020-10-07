import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SelectComponent } from '@components/select/select.component';
import { ResultsComponent } from '@components/results/results.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'select' },
  { path: 'select', component: SelectComponent },
  { path: 'results', component: ResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
