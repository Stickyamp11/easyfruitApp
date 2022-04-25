import {sharedData} from "../../shared/sharedData"
import Cart from "../cart/ca-rt.vue"
import Card from "../Draggable/ca-rd.vue"
import Board from '../Draggable/boa-rd.vue'
import * as cartService from "@/shared/services/cartService"
export default {
  name: 'nav-bar',
  components: {Cart, Card,Board},
  props: [
    'userLogged'
  ],
  data () {
    return {
      sharedData,
      Cart,
      isUserLogged: Boolean,
      isStoreManager: Boolean,
      counter: '',
    }
  },
  computed: {

  },
  created (){
    /*this.$root.on('refreshNavbar', () => {
      console.log('Noticed about the root refreshNavbar');
      this.$forceUpdate;

    });*/
  },
  mounted () {
    this.isStoreManager = false;
    this.isUserLogged = false;
   this.exampletry();
   this.jsStuffToAdd();
   this.updateCounterItems();
    
  },
  methods: {

    forceUpdate(){
      console.log('updated')
      this.$forceUpdate()
    },

    logout(){
      if(localStorage.getItem('token'))
      {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('isStoreManager');
      this.isUserLogged = false;
      this.isStoreManager = false;
      }
      console.log(localStorage.getItem('token'))
        //localStorage.getItem('token') = null;
        //localStorage.getItem('userEmail') = null;
      
    },


    exampletry(){
      console.log('NavBar mounted')
      this.isUserLogged = localStorage.getItem('token');
      console.log('isStore', localStorage.getItem('isStoreManager'))
      if(localStorage.getItem('isStoreManager') == 'si') 
      {
        this.isStoreManager = true;
      }
 
      console.log(this.userLogged)
    },

    updateCounterItems(){
       cartService.getNumberOfItems().then(res => {
        this.counter = res.data;
       });
    },



    jsStuffToAdd(){

        /*document.getElementById('dismiss').addEventListener('click', function () {
            // hide sidebar
            document.getElementById('sidebar').classList.remove('active');
             //
             document.getElementById('sidebar').style.display = 'none';
            // hide overlay
            document.getElementsByClassName('overlay-sidebar')[0].classList.remove('active');
        });*/

        document.getElementsByClassName('overlay-sidebar')[0].addEventListener('click', function () {
          // hide sidebar
          document.getElementById('sidebar').classList.remove('active');
          //
         // document.getElementById('sidebar').style.maxWidth = '0px';
           // document.getElementById('sidebar').style.minWidth = '0px';
           //document.getElementById('sidebar').style.display = 'none';
           document.getElementById('sidebar').style.visibility = 'hidden';

         // hide overlay
         document.getElementsByClassName('overlay-sidebar')[0].classList.remove('overlay-sidebar-active');
     });

        document.querySelector('#sidebarCollapse').addEventListener('click', function () {
            // open sidebar
            document.getElementById('sidebar').classList.add('active');
            //
           // document.getElementById('sidebar').style.maxWidth = '250px';
            //document.getElementById('sidebar').style.minWidth = '250px';
           //document.getElementById('sidebar').style.display = 'block';
           document.getElementById('sidebar').style.visibility = 'visible';



            // fade in the overlay
            document.getElementsByClassName('overlay-sidebar')[0].classList.add('overlay-sidebar-active');

        });




        //Dragable stuff for cart icon css when DRAG START
        document.addEventListener("dragstart", function() {
          console.log('dragstart')
          if(!document.getElementById('cart-content').classList.contains('show'))
          {
                  setTimeout(function changePos() 
                  {

                          // store a ref. on the dragged elem
                      let cartIcon = document.getElementById('cart-button-web')
                      // if(cartIcon.style.display != 'none')
                        //{
                          cartIcon.classList.add('cart-button-active')
                          cartIcon.classList.remove('fa-2x');
                          cartIcon.classList.add('fa-6x');
                          cartIcon.style.color = 'rgb(25, 107, 2)';
                          //cartIcon.style.background = 'rgba(255, 255, 255, 1)';
                          //cartIcon.style.borderRadius = '100%';
                          //cartIcon.style.width = '20%';
                          //cartIcon.style.height = '20%';


                          //hidde counter items in the cart
                          document.getElementById('cart-button-web-counter').style.display = 'none';
                          // fade in the overlay
                          document.getElementsByClassName('overlay-cart-button')[0].classList.add('overlay-cart-button-active');
                        


                  }, 10);
         
          }


           
          
          

         //}
        }, false);

          //Dragable stuff for cart icon css when DRAG START

          document.addEventListener("dragend", function() {
            if(!document.getElementById('cart-content').classList.contains('show'))
          {
                console.log('drop')
                event.preventDefault();
                // store a ref. on the dragged elem
              let cartIcon = document.getElementById('cart-button-web')
              if(cartIcon.style.display != 'none')
              {
                cartIcon.classList.remove('fa-6x');
                cartIcon.classList.add('fa-2x');
                cartIcon.classList.remove('cart-button-active')
                cartIcon.style.color = 'black';
      
      
                
                
                //show counter items in the cart
                document.getElementById('cart-button-web-counter').style.display =  'block';
                // fade in the overlay
                document.getElementsByClassName('overlay-cart-button')[0].classList.remove('overlay-cart-button-active');


                //Update counter elements
                //this.updateCounterItems();
                cartService.getNumberOfItems().then(res => {
                  this.counter = res.data;
                 });

                
      
              }
        
          }

          }.bind(this), false);


          //TODO ADD FUNCTIONS TO SHOW CART ICON AND HIDE IT WHEN CLICK

          window.onload = function(){
            //Enable click in the cart icon
            document.getElementById('cart-button-web').addEventListener('click', function(){
              document.getElementById('cart-button-web').style.display = document.getElementById('cart-button-web').style.display == 'none' ? 'block' : 'none';
              document.getElementById('cart-button-web-counter').style.display = document.getElementById('cart-button-web-counter').style.display == 'none' ? 'block' : 'none';

            }, false);
            //Enable click in the counter
            document.getElementById('cart-button-web-counter').addEventListener('click', function(){
              document.getElementById('cart-button-web').style.display = document.getElementById('cart-button-web').style.display == 'none' ? 'block' : 'none';
              document.getElementById('cart-button-web-counter').style.display = document.getElementById('cart-button-web-counter').style.display == 'none' ? 'block' : 'none';

              //Also when clicking counter, we need to set collapse to show so:
              document.getElementById('cart-content').classList.add('show');
            }, false);

            document.getElementById('button-cart-close-content').addEventListener('click', function(){
             // this.updateCounterItems();
             console.log('Estoy en el close y he llamado al cartservice en principio')
             console.log(this)
             cartService.getNumberOfItems().then(res => {
              this.counter = res.data;
             });
              document.getElementById('cart-button-web').style.display = document.getElementById('cart-button-web').style.display == 'none' ? 'block' : 'none';
              document.getElementById('cart-button-web-counter').style.display = document.getElementById('cart-button-web-counter').style.display == 'none' ? 'block' : 'none';

            }.bind(this), false);

            

          }
        

        










      },


      async onDrop(event){
        const productId = event.dataTransfer.getData('productId')
      //  const productFStore = event.dataTransfer.getData('productFStore')
        if(productId)
        {
          await cartService.insertProductIntoCart(productId).then(res => {
            if(res.status == 201){
              console.log('product Added to Cart');
              this.$refs['customerCart'].updateCart();
            }
            else{
              console.log('Error adding to cart');

            }
            

          });

        }
        
        
    },
    
  }







}


