<template>
<section>
<form  class="create-product-form" @submit.prevent="">
   <div class="form-group row">

            <div class="form-group col-sm-6">
                <div>
                <label for="Image" class="form-label">Previsualización del producto</label>
                 <div id="frame-create-wrapper"> 
                  <img id="frame-create" ref="frame-ref" src="" class="img-fluid" />
                 </div>
                <input style="display: none;" class="form-control" type="file" accept="image/jpeg" id="formFile" v-on:change="preview()" v-on:click="clearImage()">
                <button class="btn btn-primary" @click="clickUploadImg()">Seleccionar imagen</button>
                </div>
            </div>
            

            <div class="form-group col-sm-6" style="margin-top: 3%;">
              <label for="inputEmail4">Nombre</label>
              <input type="text" v-model="productName" class="form-control" id="inputEmail4" >

              <label for="inputCategory">Categoría</label>
              <select v-model="categorySelected" class="form-select" id="inputCategory" style="display: block;">
                <option v-for="category in categories" :key="category.id">{{category.name}}</option>
              </select>

              <label for="inputName">Descripción</label>
              <textarea type="text" v-model="productDescription" class="form-control" id="inputName"></textarea>

              
              <div class="methods-wrapper pt-2">
                <span>Métodos de venta aceptados</span>
               <div class="row pt-2 pb-3">
                    <div class="col-4 d-flex justify-content-center" id="methods_accepted">
                      <input class="form-check-input" type="checkbox" id="checkKg" v-model="acceptKg">
                      <label class="form-check-label" for="checkKg">Kg</label>
                    </div>
                    <div class="col-4 d-flex justify-content-center" id="methods_accepted">
                      <input class="form-check-input" type="checkbox" id="checkUnits" v-model="acceptUnits">
                      <label class="form-check-label" for="checkUnits">Unidades</label>
                    </div>
                    <div class="col-4 d-flex justify-content-center" id="methods_accepted">
                      <input class="form-check-input" type="checkbox" id="checkPacks" v-model="acceptPacks">
                      <label class="form-check-label" for="checkPacks">Packs</label>
                    </div>
               </div>

               <div class="row">
                    <div class="col-3">
                      <input class="input_prices" type="text" id="price_per_kg" v-model="pricePerKg" :disabled="!acceptKg" >
                      <label class="form-check-label" for="price_per_kg">Precio del Kg(€)</label>
                    </div>
                    <div class="col-3">
                      <input class="input_prices" type="text" id="price_per_unit" v-model="pricePerUnit" :disabled="!acceptUnits">
                      <label class="form-check-label" for="price_per_unit">Precio de la unidad(€)</label>
                    </div>
                    <div class="col-3">
                      <input class="input_prices" type="text" id="pack_quantity" v-model="packQuantity" :disabled="!acceptPacks">
                      <label class="form-check-label" for="packQuantity">Unidades del paquete(Uds)</label>
                    </div>
                    <div class="col-3">
                      <input class="input_prices" type="text" id="price_per_pack" v-model="pricePerPack" :disabled="!acceptPacks">
                      <label class="form-check-label" for="price_per_pack">Precio del paquete(€)</label>
                    </div>
               </div>
              </div>

            </div>

           
   </div>


  <div class="form-group row">
    
  <div class="form-group col-md-12">
    
  </div>
  
  </div>

  <div class="form-group row"  style="margin-top: 2%;">
     <div class="form-group col-md-6 col-12 d-flex justify-content-center">
    <button type="submit" class="btn-option-create-product btn btn-success"  v-on:click="handleSubmit">Crear</button>
     </div>

      <div class="form-group col-12 col-md-6 d-flex justify-content-center">
    <button type="submit" class="btn-option-create-product btn btn-danger"  v-on:click="$router.go(-1)">Volver</button>
     </div>
    
    
</div>
  
</form>


<DialogSuccessNotification :link='successLink' ref="loginDialogStatusSuccess">
    <div class="modal-content">
        <p>
          Producto creado correctamente
        </p>
    </div>
    </DialogSuccessNotification>

    <DialogErrorNotification :link='successLink' ref="loginDialogStatusError">
      <div class="modal-content">
          <p>
            Error al crear el producto
          </p>
      </div>
      </DialogErrorNotification>
</section>
</template>

<script>
import * as storeService from "../../shared/services/storeService"
import * as categoryService from "../../shared/services/categoryService"
import * as productService from "../../shared/services/productService"
import {sharedData} from "../../shared/sharedData"
import DialogSuccessNotification from "../Dialogs/DialogSuccessNotification/dialog-notification.vue"
import DialogErrorNotification from "../Dialogs/DialogErrorNotification/dialog-notification.vue"




export default {
  name: 'create-product',
  components: {DialogSuccessNotification,DialogErrorNotification},
  props: [],
  data () {
    return {
      sharedData,
      dialogSuccess: false,
      productName: 'Manzana',
      productCategory: '',
      productDescription:'Producto del...',
      productId: 0,
      storeInfo: '',
      categories: [],
      categorySelected: '',
      acceptKg: false,
      acceptUnits: false,
      acceptPacks: false,
      pricePerKg: 0.00,
      pricePerUnit: 0.00,
      packQuantity: 0,
      pricePerPack: 0.00,
      processStatus: 'success',
      successLink: '/storemanagement'

    }
  },
  computed: {

  },
  created(){

    this.refreshData();
  },
  mounted () {
   
  },
  methods: {
    
    preview() {
                this.$refs["frame-ref"].src = URL.createObjectURL(event.target.files[0]);
            },
    clearImage() {
                this.$refs["frame-ref"].src = "";
            },

    async refreshData(){
      //We get store info from user logged email registered in DB
       await storeService.getStoreDataByManagerEmail(localStorage.getItem('userEmail')).then((response) => {
                this.storeInfo = response.data
            }).catch((error) => {
                console.error(error);
            })


        //When you have product data, then , you call to get categories
          this.getProductCategories();
    },

    async handleSubmit(){
      let sendProduct = {
        fCategory: this.categories.find(i => i.name == this.categorySelected).id,
        description: this.productDescription,
        name: this.productName,
        product_img: document.querySelector('input[type=file]').files[0],
        fStore: this.storeInfo.id,
        price_per_kg: this.acceptKg ? this.pricePerKg : 0,
        price_per_unit: this.acceptUnits ? this.pricePerUnit : 0,
        price_per_pack: this.acceptPacks ? this.pricePerPack : 0,
        packQuantity: this.acceptPacks ? this.packQuantity : 0,
        methodsAllowed: this.getMethodsForProduct()
      }

     await productService.createProduct(sendProduct).then(response =>
     {

      if(response.status == 201)
      {

      
     //Set the id of the created product
          this.productId = response.data.id;
          

          let formData = new FormData();

          let myFile = document.querySelector('input[type=file]').files[0];
          myFile.fileId = this.productId;
          formData.append("file", myFile);
          formData.append("id",this.productId);
          
          productService.uploadImg(formData).then((response) => {
              if(response.status == 201){
                 //This was a success
                  this.processStatus = 'success';
                  this.showDialogProcessResult();
              }

          }).catch((error) => {
          console.error(error);
           //This was a error
          this.processStatus = 'error';
          this.showDialogProcessResult();
          })
          
      }
      else{
        //This was a error
          this.processStatus = 'error';
          this.showDialogProcessResult();
      }
     }).catch((error) => {
            console.error(error);
            //This was a error
          this.processStatus = 'error';
          this.showDialogProcessResult();
            });
    
   


    },

     async getProductCategories(){
            await categoryService.getCategories().then((response) => {
               this.categories = response.data;
            }).catch((error) => {
               console.error(error);
               this.processStatus = 'error';
               this.showDialogProcessResult();
            })
       },

    getMethodsForProduct(){
      let methods = ""
      if(this.acceptKg){
        methods += "kg;" 
      }
      if(this.acceptUnits){
        methods += "pieces;" 
      }
      if(this.acceptPacks){
        methods += "pack" 

      }
      return methods

    },

    clickUploadImg(){
      document.getElementById('formFile').click();
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
#methods_accepted{
  padding: 0;
}
.form-check-input{
  margin-right: 45%;
}
.form-check-label{
    margin-left: 0%;
}
.input_prices{
  width: 100%;
}
.input_prices:focus{
  border-color: rgb(37, 36, 52);
}

.input_prices:disabled{
  content-visibility: none;
}
#frame-create-wrapper{
    width: 256px;
    height: 256px;
    display: block;

    background-color: rgb(67, 67, 68);

}
#frame-create{
    width: 256px;
    height: 256px;
}
#formFile{
  margin-top: 10%;
  width: 80%;
}

.create-product-form{
  padding: 5%;
  padding-bottom: 0%;
  width: 80%;
  margin-left: 10%;
  margin-top: 10%;
  background-color: rgba(90, 202, 94, 0.377);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.create-product-form input:focus{
  border: 1px solid rgba(10, 46, 20, 0.604);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(16, 59, 7, 0.3) 0px 1px 3px -1px;
}
.create-product-form textarea:focus{
  border: 1px solid rgba(10, 46, 20, 0.604);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(16, 59, 7, 0.3) 0px 1px 3px -1px;
}
.create-product-form :checked{
 background-color: rgb(13, 85, 28);
 color: rgb(255, 255, 255);
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
   .create-product-form{
  width: 90%;
  margin-left: 5%;
}
  .btn-option-create-product{
    width: 100%;
  }
}
.form-control{
  width: 95%;
}

.btn-option-create-product{
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 5%;
  padding-bottom: 5%;
}
</style>