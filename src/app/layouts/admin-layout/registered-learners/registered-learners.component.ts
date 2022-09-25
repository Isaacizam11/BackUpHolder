import { Component, OnInit } from '@angular/core';
import { CentreService } from '../services/centre.service';

@Component({
  selector: 'app-registered-learners',
  templateUrl: './registered-learners.component.html',
  styleUrls: ['./registered-learners.component.scss']
})
export class RegisteredLearnersComponent implements OnInit {

  learners: any[] = [];
  public query: any = '';
  constructor(private centreService: CentreService) { }

  ngOnInit() {
    this.getLearners();
  }

  getLearners() {
    this.centreService.getLearners().subscribe(result => {
        this.learners =  result;
        console.log(this.learners)
    })
  }


  getUserTypeDesc(value) {
    return value == 1 ?  "Junior" : "Senior";
  }

}
