import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import * as WC from 'woocommerce-api';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  @ViewChild('productSlides') productSlides: Slides;
  constructor(public navCtrl: NavController) {
    this.WooCommerce = WC({
      url: 'http://localhost/wordpress/',
      consumerKey: 'ck_077957b6f9044e67200d151f7ee5fb9e3e272938',
      consumerSecret: 'cs_be94e6c18a7e02327419d7be686c25abc2636e01',
    });
    this.WooCommerce.getAsync('products').then( (data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err);
    })
  }

  ionViewDidLoad() {
    setInterval(() => {
      if( this.productSlides.getActiveIndex() == this.productSlides.length()-1) {
        this.productSlides.slideTo(0);
      }
      this.productSlides.slideNext();
    },3000);
  }

}
