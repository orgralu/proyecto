import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  AlertController
} from "ionic-angular";
import { ProductoProvider } from "../../providers/producto/producto";
import { Producto } from "../../modelo/producto.modelo";
import { ProductoModificarPage } from "../producto-modificar/producto-modificar";

@IonicPage()
@Component({
  selector: "page-productos-listar",
  templateUrl: "productos-listar.html"
})
export class ProductosListarPage {
  productos: Array<Producto> = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productoProvider: ProductoProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {
    
  }

  ionViewDidLoad() {
    this.productoProvider.listar_producto().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  editar(producto) {
    let productoModal = this.modalCtrl.create(ProductoModificarPage, producto);
    productoModal.present();
  }

  eliminar(p){
    this.productoProvider.eliminar_producto(p).subscribe(data=>{
      if(data.ok == true){
        const alert = this.alertCtrl.create({
          title: 'ELIMINADO!',
          buttons: [{
            text : "OK",
            handler: data => {
              this.navCtrl.setRoot(ProductosListarPage);
            }
          }]
        });
        alert.present();
      }
    }, err => {
    })
  }

  eliminar2(p) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: 'Desea eliminar el producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminar');
            this.productoProvider.eliminar_producto(p).subscribe(data=>{
              if(data.ok == true){
                this.navCtrl.setRoot(ProductosListarPage);
              }
            }, err => {
            })
          }
        }
      ]
    });
    alert.present();
  }

}