import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { QuizService } from 'src/app/services/quiz.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private _quiz:QuizService,
    private _route:ActivatedRoute,
    private _cat: CategoryService,
    private _router:Router){}
  qId:any=0;
  quiz:any;
  categories:any;
  ngOnInit(): void {

this.qId = this._route.snapshot.params['qid'];
this._quiz.getQuiz(this.qId).subscribe((data:any)=>{
  this.quiz=data;
  console.log(this.quiz);
},

(error:any)=>{
  console.log(error);
});

this._cat.categories().subscribe((data:any)=>{
  this.categories=data;
  console.log(this.categories);
},

(error:any)=>{
  alert("Error in loading categories")
});
  }

  public updateData(){
    this._quiz.updateQuiz(this.quiz).subscribe((data:any)=>{
      Swal.fire("Success !!",'Quiz Updated','success').then((e)=>{
        this._router.navigate(['/admin/quizzes']);
      });
    },
    (error:any)=>{
      Swal.fire("Error !!",'Error in updating quiz','error');
    }
    )
  }

}
