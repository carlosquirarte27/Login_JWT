import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RacesComponent } from './pages/races/races.component';
import { RaceResultsComponent } from './pages/race-results/race-results.component';
import { SingupComponent } from './pages/singup/singup.component';
import { HomeComponent } from './pages/home/home.component';
import { CircuitsComponent } from './pages/circuits/circuits.component';
import { LogeadoComponent } from './logeado/logeado.component';
const routes: Routes = [
  {path: '',redirectTo:'home', pathMatch:'full'},
  {path: 'logeado',component:LogeadoComponent},
  {path:'home',component:HomeComponent},
  {path: 'login',component:LoginComponent},
  {path:'singup',component:SingupComponent},
  {path: 'users',component:UsersComponent},
  {path: 'races',component:RacesComponent},
  {path: 'circuits',component:CircuitsComponent},
  {path: 'races-results/:_id',component:RaceResultsComponent},
  {path: '**',component:NotFoundComponent,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }


