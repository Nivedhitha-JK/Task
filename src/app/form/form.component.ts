import { Component, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { TableComponent } from '../table/table.component';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  userForm!: FormGroup;
  userDetails:any; // var to store existing user while editing
  tableBtn:boolean = false;
  isEditMode:boolean = false;

  @Output() userUpdated = new EventEmitter<any>();



  constructor(private fb:FormBuilder, private userService:UserService,
    private router: Router,
    private route:ActivatedRoute){



    this.userForm = this.fb.group({
      id: [null],
      username : ['',[Validators.required]],
      email:['', [Validators.required]],
      password:['',[Validators.required]],
      phone: ['',[Validators.required]],
      designation: ['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      gender:['',[Validators.required]]
    })
  }


  ngOnInit():void{
    // this.userForm.patchValue(this.userDetails);


    this.route.params.subscribe(params => {
      if(params['data']){
        this.isEditMode = true;
        this.userDetails = JSON.parse(params['data']);
        this.userForm.patchValue(this.userDetails);
        console.log('need to update user data');
        console.log(this.userDetails);
        this.tableBtn = true;
      }
      else{
        this.isEditMode = false;
        this.userForm.reset();
      }
    })
  }

  submit(){
    if(this.userForm.valid){
    const user = this.userForm.value;

    if(user.id){
      this.userService.updateUser(user.id,user).subscribe((res) => {
       this.userUpdated.emit(res);
       window.alert('User data updated successfully');
       this.router.navigate(['/table']);
      })
    }
    else{
      this.userService.addUser(this.userForm.value).subscribe((res)=>{
        console.log(res);
        this.userDetails = res;
        this.tableBtn = true;
      })
    }
  

  }
  }

  loadUser(user:any){
    this.userForm.patchValue(user);
  }


  table(){
   this.router.navigate(['/table']);
  }
}
