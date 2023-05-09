import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { defaultUrlMatcher } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
constructor(private userService:UserService,private snack:MatSnackBar){}

  public user={
    username: '',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };
formSubmit(){
  console.log(this.user);
  if(this.user.username=='' || this.user.username==null){
    this.snack.open("Username is required !!", '',{
      duration:3000,
   
      
    });
    return;
  }

  //validate more eith js


  //addUser calling through userService
  this.userService.addUser(this.user).subscribe(

    (data:any)=>{
      console.log(data);
      // alert("success");
      Swal.fire('Successfully done !!','User id is' +data.id,'success');
    },
    (error)=>{
      //error
      console.log(error);
      // alert("something went wrong");
      this.snack.open('Something went wrong !!', '',{
        duration:3000,
      });
      
    }
  )
}


//this.user
}
