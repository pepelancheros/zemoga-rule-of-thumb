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
    whiteBorder();  
    
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

function whiteBorder() {
  var button_thumb = document.getElementsByClassName('btn-thumb');
  for (var i = 0; i < button_thumb.length; i++) {
    button_thumb[i].addEventListener('click', addBorder);
  }
  function addBorder() {
    if (!this.classList.contains('white-border')){
      this.classList.add('white-border');
    } else {
      this.classList.remove('white-border');
    }
  }
}