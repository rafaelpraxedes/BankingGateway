import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

//import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'message-window',
    template: 
    		`
            <h1 class="h1-Main">{{title}}</h1>
            <div class="sessionContainer" onload>
                <br />
                <h3> {{message}} </h3>
            </div>
            <br />
            <button (click)="goBack()">Back</button>
            `,
    styleUrls: ['./app.component.css']
})

export class ResultComponent implements OnInit, OnDestroy {

  title: String = 'Message Window';
  message: String;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    //this.route.params
    //  .switchMap((params: Params) => params['message'])
    //  .subscribe(params => this.message = params['message']);
    this.sub = this.route.params.subscribe(params => {
       this.message = params['message']; });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }
}


