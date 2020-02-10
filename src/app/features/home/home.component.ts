import { Component, OnInit } from '@angular/core';
import * as data from '../../../incoming/data.json';


var positive_votes = JSON.parse(localStorage.getItem('localfile-positive')) || new Array(data.people.length).fill(0);
var negative_votes = JSON.parse(localStorage.getItem('localfile-negative')) || new Array(data.people.length).fill(0);

var positive_width_votes = JSON.parse(localStorage.getItem('localfile-width-positive')) || new Array(data.people.length).fill(50);
var negative_width_votes = JSON.parse(localStorage.getItem('localfile-width-negative')) || new Array(data.people.length).fill(50);

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

//function to get the information from the file data.json
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

//general function for the votations
function checkForVote() {

  

  var btn_upvote = Array.prototype.slice.call(document.getElementsByClassName('thumb-up'));
  var btn_downvote = Array.prototype.slice.call(document.getElementsByClassName('thumb-down'));
  var btn_total = Array.prototype.slice.call(document.getElementsByClassName('btn-vote'));
  

  var fill_positive = document.getElementsByClassName('width-primary') as HTMLCollectionOf<HTMLElement>;
  var fill_negative = document.getElementsByClassName('width-secondary') as HTMLCollectionOf<HTMLElement>;

  for (var i = 0; i < btn_upvote.length; i++) {
    btn_upvote[i].addEventListener('click', upVote);
    btn_downvote[i].addEventListener('click', downVote);
    btn_total[i].addEventListener('click', sendVote);
    fill_positive[i].style.width = positive_width_votes[i].toString() + "%";
    fill_negative[i].style.width = negative_width_votes[i].toString() + "%"; 
  }

  //function for the positive button
  function upVote() {
    var actual_index = btn_upvote.indexOf(this);
    if(btn_downvote[actual_index].classList.contains('clicked')) {
      negative_votes[actual_index]--;
    }
    if (!this.classList.contains('clicked')) {
      this.classList.add('clicked','white-border')

      positive_votes[actual_index]++;
      
      console.log(getTotal(positive_votes, actual_index))

      btn_downvote[actual_index].classList.remove('clicked','white-border');
    }
    positive_width_votes[actual_index] = getTotal(positive_votes, actual_index);
    negative_width_votes[actual_index] = getTotal(negative_votes, actual_index);
  }
  //function for the negative function
  function downVote() {
    var actual_index = btn_downvote.indexOf(this);
    if(btn_upvote[actual_index].classList.contains('clicked')) {
      positive_votes[actual_index]--;
    }
    if (!this.classList.contains('clicked')) {
      this.classList.add('clicked','white-border')
      negative_votes[actual_index]++;

      console.log(getTotal(negative_votes, actual_index))
      
      btn_upvote[actual_index].classList.remove('clicked','white-border');
    }
    positive_width_votes[actual_index] = getTotal(positive_votes, actual_index);
    negative_width_votes[actual_index] = getTotal(negative_votes, actual_index);
  }
  //function to vote and apply changes to the elements
  function sendVote() {
    //generate the local files with the data updated
    localStorage.setItem('localfile-positive', JSON.stringify(positive_votes));
    localStorage.setItem('localfile-negative', JSON.stringify(negative_votes));
    localStorage.setItem('localfile-width-positive', JSON.stringify(positive_width_votes));
    localStorage.setItem('localfile-width-negative', JSON.stringify(negative_width_votes));

    //check in the consolethe number of votes
    var local_positive = localStorage.getItem('localfile-positive');
    var local_negative = localStorage.getItem('localfile-negative');    
    console.log('positive votes: ', JSON.parse(local_positive));
    console.log('negative votes: ', JSON.parse(local_negative));

    var actual_index = btn_total.indexOf(this);
    btn_downvote[actual_index].classList.remove('clicked','white-border');
    btn_upvote[actual_index].classList.remove('clicked','white-border');

    //asign the width of the containers
    fill_positive[actual_index].style.width = positive_width_votes[actual_index].toString() + "%";
    fill_negative[actual_index].style.width = negative_width_votes[actual_index].toString() + "%";
  }
  //function to get the percentage of the votes
  function getTotal(vote, index) {
    var new_value = vote[index];
    var total_avg = 0;
    total_avg = Math.round((new_value / (positive_votes[index] + negative_votes[index]))*100);
    return total_avg;
  }
}