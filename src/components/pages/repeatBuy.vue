<template>
<section class="buy-order" v-if="dialogActive">
    <!-- This is a loop to show the products-->

<div class="buy-order-inner">
    <div class="buy-order-inner-header">
        <div class="row align-items-center justify-content-center">
            <div class="col-9">
                  <span class="ml-3" id="buy-order-title">Resumen del pedido para {{storeInfo.name}}</span>
            </div>
            <div class="col-3 text-right ">
                <button id="button-close-repeat-buy" class="btn btn-circle" v-on:click="hidde(); jsClickClose();"><i class="fa-solid fa-x" style="font-size: 1.8rem;"></i></button>
            </div>
        </div>
        <hr style="margin: 0;">
    </div>
    <div class="buy-order-inner-body">
    <div class="cart-products-show" 
    v-for="product in products" 
    :key="product.id">

    <!-- Content card for products -->
        <div class="card border-success" id="product-card">
            <div class="card-body" id="card-body-product">
                 <div class="row">
                    <div class="col-6 text-left">
                        <h5 class="card-title">{{product.name}}</h5>
                    </div>
                    <div class="col-6 text-right">
                    <button id="buy-order-delete-button" class="btn btn-danger"><i class="fa-solid fa-x" v-on:click="discardProduct(product)"></i></button>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-12 col-sm-4 d-flex justify-content-center">
                    <img id="buy-item-card-img" class="card-img-top" :src="product.product_img" alt="Card image cap">
                    </div>
                    <div class="col-12 col-sm-8">

                             <!-- Shows the price for the product -->
                            <div class="row">
                                <div class="col-12 d-flex justify-content-center align-items-middle">
                                        <h5 v-if="product.methodSelected == 'kg'" class="card-title"><span class="mr-2">Precio del Kg:</span>{{product.price_per_kg.toFixed(2)}}€</h5>
                                        <h5 v-if="product.methodSelected == 'pieces'" class="card-title"><span class="mr-2">Precio de la unidad:</span>{{parseFloat(product.price_per_unit).toFixed(2)}}€</h5>
                                        <h5 v-if="product.methodSelected == 'pack'" class="card-title"><span class="mr-2">Precio del Pack:</span>{{parseFloat(product.price_per_pack).toFixed(2)}}€</h5>
                                </div>
                            </div>
                        
                            
                            <div class="row mt-5 ml-0 mr-0 p-2 d-flex justify-content-center align-items-center" id="row-methods-select-units">
                                <div class="col-5" style="padding: 0;">
                                 <label for="methodSelect">Método de medida</label>
                                </div>
                                        <!-- Second col of the first row with a message-->
                                        <div v-if="product.methodSelected == 'kg'" class="col-7" style="padding: 0;">
                                            
                                            <div id="info-kg">
                                                    <i class="fa-solid fa-circle-exclamation"></i> El peso puede no ser exacto
                                            </div>
                                           

                                        </div>
                                        <div v-if="product.methodSelected == 'pieces'" class="col-7" style="padding: 0;">
                                            
                                             <div id="green-pieces" style="">
                                                    <i class="fa-solid fa-circle-check"></i> Medida exacta
                                            </div>
                                            
                                                
                                               
                                        

                                        </div>
                                        <div v-if="product.methodSelected == 'pack'" class="col-7" style="padding: 0;">
                                            
                                                <div id="warning-pack">
                                                    <i class="fa-solid fa-circle-exclamation"></i> El pack de este producto contiene {{product.packQuantity}} unidades
                                                </div>
                                           
                                        </div>
                                        <div v-if="product.methodSelected == ''" class="col-7" style="padding: 0;">
                                            
                                                <div id="info-about-methods">
                                                    <i class="fa-solid fa-circle-exclamation"></i> Seleccione un método de medida
                                                </div>
                                                
                                        </div>

                            </div>
                            <!-- Starts the second row with the inputs -->
                            <div class="row ml-0 mr-0 p-2 d-flex justify-content-center align-items-center" id="row-methods-select-units-second">
                                <div class="col-5">
                                     <select v-model="product.methodSelected" class="form-select" id="methodSelect">
                                     <option v-for="method in product.methodsAllowed.split(';')" :key="method">{{method}}</option>
                                     </select>
                                </div>
                                                                                                    <div v-if="product.methodSelected == 'kg'" class="col-7" style="padding: 0;">
                                                                                                            
                                                                                                                <div class="row align-items-center justify-content-center ">
                                                                            
                                                                                                                        <div class="col-5" id="custom-col">
                                                                                                                        <input type="text" v-model="product.unitsToBuy" class="form-control" id="unitsToBuy" placeholder="1.5"> 
                                                                                                                        </div>
                                                                                                                        <div class="col-5">
                                                                                                                        <label for="unitsToBuy">Kgs</label>
                                                                                                                        </div>
                                                                                                                </div>

                                                                                                    </div>
                                                                                                            <div v-if="product.methodSelected == 'pieces'" class="col-7" style="padding: 0;">
                                                                                                                
                                                                                                                <div class="row align-items-center justify-content-center ">
                                                                                                                    <div class="col-5" id="custom-col">
                                                                                                                    <input type="text" v-model="product.unitsToBuy" class="form-control" id="unitsToBuy" placeholder="6" > 
                                                                                                                    </div>
                                                                                                                    <div class="col-5">
                                                                                                                    <label for="unitsToBuy">uds</label>
                                                                                                                    </div>
                                                                                                                    
                                                                                                                
                                                                                                                </div>

                                                                                                            </div>
                                                                                                            <div v-if="product.methodSelected == 'pack'" class="col-7" style="padding: 0;">
                                                                                                        
                                                                                                                <div class="row align-items-center justify-content-center">
                                                                                                                    <div class="col-5" id="custom-col">
                                                                                                                    <input type="text" v-model="product.unitsToBuy" class="form-control" id="unitsToBuy" placeholder="1"> 
                                                                                                                    </div>
                                                                                                                    <div class="col-5">
                                                                                                                    <label for="unitsToBuy">packs</label>
                                                                                                                    </div>
                                                                                                                    
                                                                                                                
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div v-if="product.methodSelected == ''" class="col-7" style="padding: 0;">
                                                                                                        
                                                                                                                <div class="row align-items-center justify-content-center ">
                                                                                                                    <div class="col-5" id="custom-col">
                                                                                                                    <input type="text" v-model="product.unitsToBuy" class="form-control" id="unitsToBuy" placeholder="" disabled> 
                                                                                                                    </div>
                                                                                                                    <div class="col-5">
                                                                                                                    <label for="unitsToBuy">Cantidad</label>
                                                                                                                    </div>  
                                                                                                                </div>
                                                                                                            </div>
                            </div>

                            <div class="row mt-5" id="product-price-row">
                                <div class="col-12 text-right">
                                <span>Precio estimado: {{getEstimatedPriceForProduct(product).toFixed(2)}}€</span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <!-- To assign the way the order is deliver to the customer -->
    <div class="row assignMethodDeliver mt-5 mb-3 pt-3 pb-3" style="margin-left: 15%; margin-right: 15%; width: 70%;">
                <div class="col-12 col-sm-6 d-flex justify-content-center align-items-middle" style="font-weight: 500; color: green;">
                        Método de envío:
                                    
                </div>
                <div class="col-12 col-sm-6 d-flex justify-content-center align-items-middle">
                        <select v-model="deliverMethod" class="status-select" id="selectDeliverMethod">
                                <option value="takeStore">Recoger en tienda</option>
                                <option value="deliverHome">Envío a casa</option>
                        </select>                    
                </div>
    </div>

        <div class="card w-150 border-light mt-5" id="resume-buy-order">
            <div class="row align-items-center justify-content-center ">
                <div class="col-6 col-sm-5">
                     <label for="anotations-order">Observaciones</label>
                    <textarea type="text" v-model="anotationsOrder" class="form-control" id="anotations-order" placeholder="¿Qué debemos tener en cuenta?"></textarea>     
                </div>
                <div class="col-6 col-sm-7 text-right">
                    <table class="" style="width: 100%">
                        <tr  class="text-right">
                        
                            <td><b>Resumen de pedido</b>
                                <hr style="margin: 0; width: 20%; margin-left: 80%;">
                            </td>
                            
                        </tr>
                        
                        <tr  class="text-right">
                           
                            <td>Precio: ....... {{(getEstimatedPriceForAllProducts() * 0.79).toFixed(2)}}€ </td>
                        </tr>
                        <tr  class="text-right">
                        
                            <td>IVA(21%): ....... {{(getEstimatedPriceForAllProducts() * 0.21).toFixed(2)}}€</td>
                        </tr>
                        <tr  class="text-right">
                        
                            <td style="color: red;"><del>Cupón descuento: ....... 0.00€</del> </td>
                            
                        </tr>
                        <hr style="margin: 0; width: 20%; margin-left: 80%;">
                        <tr  class="text-right">
                        
                            <td>Total: ....... {{getEstimatedPriceForAllProducts().toFixed(2)}}€ </td>
                        </tr>
                    </table>
                </div>
            </div>
           
                
                    <div class="text-right mb-3">
                    <button class="btn btn-success" @Click="confirmBuy" :disabled="this.products.length <= 0">Confirmar pedido</button>
                    </div>
         </div>

       

<DialogSuccessNotification :link='successLink' ref="loginDialogStatusSuccess" @finished="closeDialog()">
    <div class="modal-content">
        <p>
          Pedido realizado con éxito
        </p>
    </div>
    </DialogSuccessNotification>

    <DialogErrorNotification :link='successLink' ref="loginDialogStatusError">
      <div class="modal-content">
          <p>
            Error al realizar el pedido
          </p>
      </div>
      </DialogErrorNotification>

</div>


</section>
</template>

<script>
import * as storeService from "@/shared/services/storeService"
import * as cartService from "@/shared/services/cartService"
import * as orderService from "@/shared/services/orderService"
import * as productService from "@/shared/services/productService"
import DialogSuccessNotification from "../Dialogs/DialogSuccessNotification/dialog-notification.vue"
import DialogErrorNotification from "../Dialogs/DialogErrorNotification/dialog-notification.vue"
export default {
    components: {DialogSuccessNotification,DialogErrorNotification},
     data(){
         return{
            products: [
             
            ],
            storeInfo: '',
            anotationsOrder: '',
            dialogActive: false,
            productsReceived: [],
            fStoreReceived: 0, 
            timesOrdered: 0,
            deliverMethod: '',
            updatedProducts: [],
            successLink: '/repeatorder',
            processStatus: 'success',
            orderId: Number,
         }
         
     },
     setup(){
     },

     mounted(){
        
     },
     props: [],
     methods: {
          hidde(){
                this.dialogActive = false;
                this.$emit('updateCart')
                  },
            show(productsR, storeR, timesorderedR, orderId, deliverMethod){
                this.products = productsR;
                this.fStoreReceived = storeR;
                this.timesOrdered = timesorderedR;
                this.orderId = orderId;
                this.deliverMethod = deliverMethod;
    
                this.dialogActive = true;
                this.getUpdatedInfoProducts();
                this.getStoreInfo();

                

             },

         getEstimatedPriceForAllProducts(){
             let total = 0;
             this.products.forEach( product => {
                total += this.getEstimatedPriceForProduct(product)
             })
             return total;
         },
         getEstimatedPriceForProduct(product){

             if(product.methodSelected == 'kg')
             {
                 return product.unitsToBuy * product.price_per_kg 
             }
             else if(product.methodSelected == 'pieces'){
                 return product.unitsToBuy * product.price_per_unit
             }
             else if(product.methodSelected == 'pack'){
                 return product.unitsToBuy * product.packQuantity * product.price_per_unit
             }
             else{
                 return 0;
             }
         },
          getStoreInfo(){
            storeService.getStoreData(this.fStoreReceived).then((response) => {
                this.storeInfo = response.data
            }).catch((error) => {
                console.error(error);
            })
            },

         confirmBuy(){
             //Before buying, we set the price for the products
             this.products.forEach( product => {
                 product['estimated_price'] = this.getEstimatedPriceForProduct(product);
             })
             let totalPrice = this.getEstimatedPriceForAllProducts();

            
             orderService.createOrderRepeated(this.storeInfo.id, localStorage.getItem('userId'), totalPrice, this.timesOrdered, this.anotationsOrder, this.deliverMethod).then((response) => {
                if(response.status == '201'){

                    orderService.createOrderItems(response.data.id, this.products).then((response) => {
                     if(response.status == 201){
                        this.processStatus = 'success';
                        this.showDialogProcessResult();
                            
                     }
                    }).catch((error) => {
                        console.error(error);
                        this.processStatus = 'error';
                        this.showDialogProcessResult();
                    })


                }
            }).catch((error) => {
                console.error(error);
                this.processStatus = 'error';
                this.showDialogProcessResult();
            })

         },

         discardProduct(product){
             let index = this.products.findIndex((item) => {
                 item.id = product.id;
             })
             if(index)
             {
               this.products.splice(index,1);
               cartService.deleteProductFromCart(product.id);
             }
             
         },

        async getUpdatedInfoProducts(){
             this.updatedProducts = [];
            await this.products?.forEach( product => {
                productService.getProductById(product.productId).then( resp => {
                    let updatedproduct = resp.data;
                    if(updatedproduct.methodsAllowed.split(';').includes(product.methodSelected))
                    {
                        updatedproduct['methodSelected'] = product.methodSelected;
                    }
                    else
                    {
                        updatedproduct['methodSelected'] = '';
                    }
                    
                    updatedproduct['unitsToBuy'] = product.unitsToBuy;
                    this.updatedProducts.push(updatedproduct);
                })

                
            })
            this.products = this.updatedProducts;

         },
      

         closeDialog(){
             document.getElementById('button-close-repeat-buy').click();
         },

         jsStuffToAdd(){
               //SHOW CART WHEN CLOSING BUY ORDER TAB
            document.getElementById('button-close-repeat-buy').addEventListener('click', function(){

              //Click "X" from cart to use js already set to display cart button and counter
              document.getElementById('button-cart-close-content').click();

            });
            
         },
         jsClickClose(){
                //Click "X" from cart to use js already set to display cart button and counter
              document.getElementById('button-cart-close-content').click();
         },

          //Dynamically show dialog error/success 
            showDialogProcessResult(){
            if(this.processStatus == 'success'){
                this.$refs['loginDialogStatusSuccess'].show();

            }
            else if(this.processStatus == 'error'){
                this.$refs['loginDialogStatusError'].show();
            }

            },




     }




}
</script>

<style>

#buy-order-title{
    text-align: left;
    color: rgba(27,112,13,255);
    font-size: 120%;
    margin-left: 5%;
    font-weight: 700;
}
#button-close-buy-order{
    font-weight: 700%;
}
#total-price-buy{
    font-size: 160%;
    color: green;
}
#anotations-order{
    width: 80%;
    height: 10rem;
}
#resume-buy-order{
    width: 72%;
    margin-left: 14%;
    margin-right: 10%;
}
#card-body-product{
    padding: 1rem;
}
#product-price-row{
    font-size: 150%;
}

#methodSelect{
    min-width: 70%;
}
#custom-col{
    padding: 0;
}
#info-about-methods{
 background-color: rgb(164, 157, 246);
    margin-bottom: 3%;   
}
#warning-pack{
    background-color: rgb(247, 247, 104);
    margin-bottom: 3%;
}
#green-pieces{
    background-color: rgb(93, 151, 98);
    margin-bottom: 3%;
    color: white;
}
#info-kg{
    background-color: rgb(195, 195, 195);
    margin-bottom: 3%;
}
#product-card{
    margin: 5%;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}

.cart-products-show{
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
}

.buy-order{
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 9998;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(30, 31, 30, 0.6);
}
.buy-order-inner{
    margin-top: 5%;
    margin-left: 20%;
    overflow-y: auto;
    overflow-x: hidden ;
    z-index: 9999;
    width: 60%;
    height: 80%;
    box-shadow: 0;
    border-radius: 0%;
    background-color: rgb(255, 255, 255);

}
 /* width */
.buy-order-inner::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.buy-order-inner::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.buy-order-inner::-webkit-scrollbar-thumb {
  background: rgb(37, 74, 26);
}
.buy-order-inner-body{
    margin-top: 8%;

}
.buy-order-inner-header{
    position: fixed;
    z-index: 10001;
    background-color: rgb(255, 255, 255);
    width: 60%;
}
#buy-item-card-img{
    width: 100%;
    height: 90%;
}
#buy-order-delete-button{
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 6px;
    padding-right: 6px;
}
#unitsToBuy{
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 6px;
    padding-right: 6px;
}

.modal-content{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border: 0;
    background-color: rgb(255, 255, 255);
    font-weight: 700;
    font-size: 120%;
}
@media (max-width: 767.98px) { 
    #buy-order-title{
    text-align: left;
    color: rgba(27,112,13,255);
    font-size: 80%;
    margin-left: 5%;
    font-weight: 500;
}

   #buy-item-card-img{
    width: 11rem;
    height: 11rem;
} 
#row-methods-select-units{
    margin-left: 5%;
    margin-right: 5%;
}
#row-methods-select-units-second{
  font-size: 120% ;
}

    #product-price-row{
    font-size: 120%;
}
.buy-order-inner{
    margin-top: 5%;
    margin-left: 5%;
    overflow-y: auto;
    overflow-x: hidden ;
    z-index: 9999;
    width: 90%;
    height: 80%;
    box-shadow: 0;
    border-radius: 0%;
    background-color: rgb(255, 255, 255);

}
.buy-order-inner-header{

    width: 90%;
}

.cart-products-show{
    margin-left: 0%;
    margin-right: 0%;
    width: 100%;
}
#resume-buy-order{
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    font-size: 70% !important;
}
#anotations-order{
font-size: 90%;
}
.buy-order-inner-body{
    margin-top: 12%;

}
 }
 
</style>
