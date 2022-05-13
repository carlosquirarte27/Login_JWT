import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from 'src/app/shared/services/users.service'; 
import { Users } from 'src/app/shared/services/interfaces/users'; 
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

  //selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>`
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'email', 'number','editar','eliminar'];
  dataSource: Users[] = [];
  public email : string = '';
  form: FormGroup;

  constructor(private Router : ActivatedRoute, private UsersService : UsersService,
    private auth: AuthServiceService, private router: Router,config: NgbModalConfig, 
    private modalService: NgbModal,private formBuilder: FormBuilder,private storageService:StorageService) { 
    if (!auth.get()){
      this.router.navigate(['/home']);
    } 
    config.backdrop = 'static';
    config.keyboard = false;
    this.form = this.formBuilder.group({
      username: [],
      email: [],
      password: [],
      number: [],
      imagen: [],
      level: []
    }
    );
  }


  ngOnInit(): void {

      this.refresh();
      console.log(this.dataSource)
    
  }

  refresh(){
    this.Router.params.subscribe( params => {
      this.email = params['_id']
    });
    this.UsersService.getUsers().subscribe( a =>{
      this.dataSource = a;
    });
    this.dataSource = this.dataSource.filter( a =>{
        a.email = this.email;
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  delete(email :string){
    console.log("vamos a borrar a :" + email)
    this.UsersService.deleteUser(email).subscribe( a =>{
      this.refresh();
    })
  }

  sendData(id:string){
    if(this.form.valid){
      const {password,username,email,number,picture,level} = this.form.getRawValue()
      if(!id){
        console.log("creando usuario")
        this.create(username,email,password,number,picture,level)
      }
      else{
        console.log("updateando:")
        this.update(id,username,email,password,number,picture,level);
      }
      this.refresh();
      } 
      else{
      console.log('Error, faltan datos',this.form);
    }
  }

  update(id:string,username:string, email:string, password:string, number:number, picture:string,level:string){
      this.UsersService.updateUser(id,username,email,password,number,picture,level).subscribe( a => {
        console.log(a);
        this.refresh()
      });
  }

  create(username:string, email:string, password:string, number:number, picture:string,level:string){
    console.log(username,email,password,number,picture);
    this.UsersService.createUser(username,email,password,number,picture,level).subscribe( a => {
      console.log(a);
      this.refresh()
    });
  }

  imagenes: any[]=[];
  cargarImagen(event:any){
    let image = event.target.files;
    let reader = new FileReader();
    const username = this.form.getRawValue()

    reader.readAsDataURL(image[0]);
    reader.onloadend= () => {
      console.log(reader.result);
      this.imagenes.push(reader.result);
      this.storageService.subirImagen(username+"_"+Date.now(),reader.result).then(urlImage =>{
        console.log(urlImage);
        return urlImage;
      });


    }



  }

}

