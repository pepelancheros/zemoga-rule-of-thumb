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
    checkForVote();
  }

}

function getInfo() {
  var name_space = document.getElementsByClassName('info__name');
  var time_space = document.getElementsByClassName('info__time');
  var description_space = document.getElementsByClassName('info__description');
  var prueba_color = document.getElementsByClassName('llenar-color-dentro') as HTMLCollectionOf<HTMLElement>;
  for (var i=0; i<data.people.length; i++) {
    var person = data.people[i];
    name_space[i].innerHTML = person.name;
    time_space[i].innerHTML = person.months + " in " + person.area;
    description_space[i].innerHTML = person.description;
    prueba_color[i].style.width = person.width;
  }
}

function checkForVote() {
  var btn_upvote = Array.prototype.slice.call(document.getElementsByClassName('thumb-up'));
  var btn_downvote = Array.prototype.slice.call(document.getElementsByClassName('thumb-down'));
  var btn_total = Array.prototype.slice.call(document.getElementsByClassName('btn-vote'));
  var width_inicial = new Array(data.people.length);
  var prueba_color = document.getElementsByClassName('llenar-color-dentro') as HTMLCollectionOf<HTMLElement>;

  var local_edit = JSON.parse(localStorage.getItem('localfile'));

  for (var i = 0; i < btn_upvote.length; i++) {
    btn_upvote[i].addEventListener('click', upVote);
    btn_downvote[i].addEventListener('click', downVote);
    btn_total[i].addEventListener('click', sendVote);
  }

  function upVote() {
    // prueba_color[btn_upvote.indexOf(this)].style.width = '50%';
    if (!this.classList.contains('clicked')) {
      this.classList.add('clicked','white-border')
      console.log('ya tiene la clase');
      var actual_index = btn_upvote.indexOf(this);
      local_edit[actual_index]++;
      console.log(local_edit[actual_index])
      localStorage.setItem('localfile', JSON.stringify(local_edit));
      btn_downvote[actual_index].classList.remove('clicked','white-border');
    }
  }
  function downVote() {
    if (!this.classList.contains('clicked')) {
      this.classList.add('clicked','white-border')
      console.log('ya tiene la clase el down');
      var actual_index = btn_downvote.indexOf(this);
      local_edit[actual_index]--;
      console.log(local_edit[actual_index])
      localStorage.setItem('localfile', JSON.stringify(local_edit));
      btn_upvote[actual_index].classList.remove('clicked','white-border');
    }
  }
  function sendVote() {
    var local = localStorage.getItem('localfile');
    console.log('retrievedObject: ', JSON.parse(local))
    var actual_index = btn_total.indexOf(this);
    btn_downvote[actual_index].classList.remove('clicked','white-border');
    btn_upvote[actual_index].classList.remove('clicked','white-border');
  }

  for (var i=0; i<data.people.length; i++) {
    var person = data.people[i];
    width_inicial[i] = person.width;
  }
  
}