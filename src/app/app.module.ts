import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {ApolloModule, Apollo, } from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {ApolloLink, concat} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import gql from 'graphql-tag';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(apollo: Apollo,
    httpLink: HttpLink) {

//let http = httpLink.create({uri: 'https://pjtmwcmo35cxni3n55p7w4v7ru.appsync-api.us-east-1.amazonaws.com/graphql'});
let http = httpLink.create({uri: 'https://qdgdveva35cwdoyrofoc7e3rca.appsync-api.ap-south-1.amazonaws.com/graphql'});
let authMiddleware = new ApolloLink((operation, forward) => {
// add the authorization to the headers
// we assume `headers` as a defined instance of HttpHeaders
operation.setContext({
//headers: new HttpHeaders().set('x-api-key', 'da2-7l3xjosnzjh4dlrfwbd2t6hq7q')
headers: new HttpHeaders().set('x-api-key', 'da2-h5bgwgjy6zc2jby52mjn6x5dh4')
});

return forward(operation);
});

apollo.create({
  link: concat(authMiddleware, http),
  cache: new InMemoryCache()
});
}       
//<const client = new ApolloClient({
//link: concat(authMiddleware, http),
//cache: new InMemoryCache(),
//defaultOptions: {
  //query: {
   // fetchPolicy: 'cache-and-network'
 // }
//}
//})
//client.query({ query: gql `
//query listTodos {
  //listTodos {
   // items{
     // id
     // name
     // completed
   // }
 // }
//}
//`}).then(r => {
//	console.info( r ) // {data: {}, loading: false, networkStatus: 7, stale: false}
//})
}        

