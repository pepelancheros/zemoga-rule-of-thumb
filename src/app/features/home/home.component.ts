import { Component, OnInit } from '@angular/core';
import * as data from '../../../incoming/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    getInfo();    
    
  }

}

function getInfo() {
  var name_space = document.getElementsByClassName('info__name');
  var time_space = document.getElementsByClassName('info__time');
  var description_space = document.getElementsByClassName('info__description');
  for (var i=0; i<data.people.length; i++) {
    var person = data.people[i];
    name_space[i].innerHTML = person.name;
    time_space[i].innerHTML = person.months + " in " + person.area;
    description_space[i].innerHTML = person.description;
  }
}
