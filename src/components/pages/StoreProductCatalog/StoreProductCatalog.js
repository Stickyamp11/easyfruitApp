import SingleProductCard from "../../Cards/SingleProductCard/single-product-card.vue";
import * as storeService from "@/shared/services/storeService"
import * as productService from "@/shared/services/productService"
import * as categoryService from "@/shared/services/categoryService"

export default {
  name: 'store-product-catalog',
  components: { SingleProductCard},
  props: {
    id:{
      type: String|Number,
      required: true,
    },
  },
  data () {
    return {
      products: [],
      storeInfo: '',
      orderBy: '',
      filterBy: '',
      originalProductsCopy: [],
      categoriesStore: []

    }
  },
  computed: {

  },
  mounted () {
    //Add javascript stuff

    let input = document.getElementById("search-bar");
    input.addEventListener('keyup', function(event) {
      event.preventDefault();
      if(event.key === 'Enter') {
        document.getElementById('search-addon').click();
      }
    })

    this.getProductCategories();
    this.getStoreInfo();
    this.getProductsDataFromStore();
  },
  methods: {
    async getProductCategories(){
      await categoryService.getCategories().then((response) => {
        this.categoriesStore = response.data;
      }).catch((error) => {
        console.error(error);
      })
      },
    getStoreInfo(){
      storeService.getStoreData(this.$route.params.id).then((response) => {
        this.storeInfo = response.data
      }).catch((error) => {
        console.error(error);
      })
    },

    getProductsDataFromStore(){
      storeService.getStoreProducts(this.$route.params.id).then((response) => {
        this.products = response.data;
        this.originalProductsCopy = response.data;
      }).catch((error) => {
        console.error(error);
      })
    },

    //Draggable items
    startDrag(event, product){
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('productId', product.id)
      event.dataTransfer.setData('productImg', product.product_img)
      event.dataTransfer.setData('productName', product.name)
      event.dataTransfer.setData('productFStore', product.fStore)
  },
  async searchProducts(){
   let textData = document.getElementById("search-bar").value;
    //We send the text input from search to backend
    await productService.getProductsByName(textData, this.storeInfo.id).then(res => {
      this.products = res.data;
      this.originalProductsCopy = res.data;
    })

  },

  orderProducts(){
    if(this.orderBy == 'asc'){
      this.products = this.products.sort((a,b) => (a.price_per_kg > b.price_per_kg) ? 1 : -1);
    }
    if(this.orderBy == 'desc'){
      this.products = this.products.sort((a,b) => (a.price_per_kg > b.price_per_kg) ? -1 : 1);
      
    }
  },

  filterProducts(){
    this.products = this.originalProductsCopy;
    this.products = this.products.filter( product => product.fCategory == this.filterBy)
    if(this.filterBy == ''){
      this.products = this.originalProductsCopy;
    }
  }


  }
}


