import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { RaceResultsService } from 'src/app/shared/services/race-results.service';
import { RaceResults } from 'src/app/shared/services/interfaces/race-results';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


const ELEMENT_DATA: RaceResults[] = [];

@Component({
  selector: 'app-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.scss']
})


export class RaceResultsComponent implements OnInit {

  
  displayedColumns: string[] = [ 'race_name', 'results', 'number_of_laps','date','editar','eliminar'];
  dataSource: RaceResults[] = [];
  public current_race : string = '';
  form: FormGroup;

  constructor(private Router : ActivatedRoute, private raceResultService : RaceResultsService , 
    private auth: AuthServiceService, private router: Router,
    private formBuilder: FormBuilder,config: NgbModalConfig, 
    private modalService: NgbModal) { 
    if (!auth.get()){
      this.router.navigate(['/home']);
    }
    this.form = this.formBuilder.group({
      results: [],
      number_of_laps: [],
      race_id: [],
      race_name: [],
      date: [],
    }
    );
  }

  ngOnInit(): void {
      this.Router.params.subscribe( params => {
        this.current_race = params['_id'];
          this.raceResultService.getResults(this.current_race).subscribe( a =>{
            this.dataSource = [a];
        });
      });
      
  }

  open(content: any) {
    this.modalService.open(content);
  }

  sendData(its_new:boolean){
    if(this.form.valid){
      const {password, confirm_password} = this.form.getRawValue()
      console.log('Enviar datos',password,confirm_password);
      this.router.navigate(['/users']);
    } else{
      console.log('Error, faltan datos',this.form);
    }
  }

}
