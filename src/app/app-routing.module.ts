import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'questionnaire',
    loadChildren: () => import('./pages/questionnaire/questionnaire.module').then(q => q.QuestionnaireModule)
  },
  {
    path: '',
    redirectTo: 'questionnaire/2',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
