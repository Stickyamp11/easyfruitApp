import axios from "axios"
import SingleStoreCard from "../../Cards/SingleStoreCard/single-store-card.vue";
export default {
  name: 'stores-catalog',
  components: {SingleStoreCard},
  props: [],
  data () {
    return {
      stores: [],
    }
  },
  computed: {

  },
  mounted () {
    this.getStoresData();
  },
  methods: {
    getStoresData(){
      axios.get('/store').then((response) => {
        this.stores = response.data
      }).catch((error) => {
        console.error(error);
      })
    }
  }
}


