import { Component, OnInit } from '@angular/core';
import * as data from '../../../incoming/data.json';


var positive_votes = JSON.parse(localStorage.getItem('localfile-positive')) || new Array(data.people.length).fill(0);
var negative_votes = JSON.parse(localStorage.getItem('localfile-negative')) || new Array(data.people.length).fill(0);

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
    var actual_index = btn_upvote.indexOf(this);
    if(btn_downvote[actual_index].classList.contains('clicked')) {
      negative_votes[actual_index]--;
    }
    // prueba_color[btn_upvote.indexOf(this)].style.width = '50%';
    if (!this.classList.contains('clicked')) {
      this.classList.add('clicked','white-border')
      positive_votes[actual_index]++;
      // console.log(positive_votes[actual_index]);
      // console.log(getTotal(actual_index));
      
      btn_downvote[actual_index].classList.remove('clicked','white-border');
    }
  }
  function downVote() {
    var actual_index = btn_downvote.indexOf(this);
    if(btn_upvote[actual_index].classList.contains('clicked')) {
      positive_votes[actual_index]--;
    }
    if (!this.classList.contains('clicked')) {
      this.classList.add('clicked','white-border')
      negative_votes[actual_index]++;
      // console.log(negative_votes[actual_index])
      
      btn_upvote[actual_index].classList.remove('clicked','white-border');
    }
  }
  function sendVote() {
    localStorage.setItem('localfile-positive', JSON.stringify(positive_votes));
    localStorage.setItem('localfile-negative', JSON.stringify(negative_votes));
    var local_positive = localStorage.getItem('localfile-positive');
    var local_negative = localStorage.getItem('localfile-negative');    
    console.log('positive: ', JSON.parse(local_positive));
    console.log('negative: ', JSON.parse(local_negative));
    var actual_index = btn_total.indexOf(this);
    btn_downvote[actual_index].classList.remove('clicked','white-border');
    btn_upvote[actual_index].classList.remove('clicked','white-border');
  }

  function getTotal(elem) {
    // var new_value = local_edit[elem];
    // var total_sum = 0;
    // var total_avg = 0;
    // for (var i = 0; i < btn_upvote.length; i++) {
    //   total_sum += local_edit[i];
    // }
    // total_avg = new_value / total_sum;

    // return total_avg;
  }

  for (var i=0; i<data.people.length; i++) {
    var person = data.people[i];
    width_inicial[i] = person.width;
  }
  
}