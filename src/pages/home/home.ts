import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, apollo: Apollo) {
    let q = gql(`
    query listTodos {
      listTodos {
        items{
          id
          name
          completed
        }
      }
    }
   
`)
 
   // console.log(q);
   
    apollo.query({query: q}).subscribe(console.log);
   
  }    
}