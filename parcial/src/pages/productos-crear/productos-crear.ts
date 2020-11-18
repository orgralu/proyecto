import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ProductoProvider } from '../../providers/producto/producto';
import { Categoria } from '../../modelo/categoria.modelo';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductosListarPage } from '../productos-listar/productos-listar';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-productos-crear',
  templateUrl: 'productos-crear.html',
})
export class ProductosCrearPage {

  categorias : Array<Categoria> = [];
  formulario : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private productoProvide: ProductoProvider,
    private fb : FormBuilder,
    public alertCtrl: AlertController,
    public toastCrl: ToastController,
    private loadingController: LoadingController
  ) {

    this.formulario = this.fb.group({
      nombre : '',
      precio : '',
      categoria : ''
    });
  }

  ionViewDidLoad() {

    this.productoProvide.listar_categoria().subscribe(data=>{
      this.categorias = data;
      console.log("hola");
    }, err => {

    });
  }

  /*
  guardar(){
    this.productoProvide.crear_producto(this.formulario.value).subscribe(data=>{
      if(data.ok == true){
        const alert = this.alertCtrl.create({
          title: 'Producto Creado!',
          buttons: [{
            text : "OK",
            handler: data => {
              //this.navCtrl.setRoot(ProductosListarPage);
              window.location.reload();
            }
          }]
        });
        alert.present();
        
      }
    }, err => {
    })
  }*/

  async guardar(){
    if(this.formulario.value.nombre == '' || this.formulario.value.precio == '' || this.formulario.value.categoria == ''){
      const toast = this.toastCrl.create({
        message: 'Digite los datos',
        duration: 3000
      });
      (await toast).present();
    }else{
      const toast = this.toastCrl.create({
        message: 'GUARDANDO...',
        duration: 3000
        //position: 'middle'
      });
      (await toast).present();
      this.productoProvide.crear_producto(this.formulario.value).subscribe(data=>{
        if(data.ok == true){
          //this.navCtrl.setRoot(ProductosListarPage);
          window.location.reload();
        }
      }, err => {
      })
    }
  }
}
