<template>
    <div id="dashboard">
        <div>
                <input type="text" v-model="search" placeholder="search products by name" />
               <table class="responsive-table">
                <caption>Products</caption>
                <tr>
                 <th>ID</th>
                 <th> Name</th>
                 <th>  Quantity</th>
                 <th> Buying Price </th>
                 <th>Cost Price </th>
                 <th>Selling Price </th>
                 <th>Size</th>
                 <th>Action</th>
                </tr>
                <tr v-for="product in   filteredProducts.sort((a,b)=>{return b.product_id - a.product_id})  "  v-bind:key="product.id" class="collection-item">
                    <td>{{product.product_id}}</td>
                    <td>{{product.name}}</td>
                    <td>{{product.quantity}}</td>
                    <td>{{product.buyingPrice}}</td>
                    <td>{{product.costPrice}}</td>
                    <td>{{product.sellingPrice}}</td>
                    <td>{{product.size}}</td>
                    <td>
                        <div>
                              <router-link class="secondary-content" v-bind:to="{name:'barcode-product',params:{product_id: product.product_id}}">
                                     <i class="fa fa-barcode"></i>
                               </router-link>
                        </div>
          
                        <div>
                           <router-link class="secondary-content" v-bind:to="{name:'view-product',params:{product_id: product.product_id}}">
                              <i class="fa fa-eye"></i>
                           </router-link>
                        </div>
          
           
              </td>
                </tr>
                </table>
        </div>
      
        <div class="fixed-action-btn">
            <router-link to='/new' class="btn-floating btn-large red">
            <i class="fa fa-plus"></i>
            </router-link>
        </div> 
    </div> 
</template>

<script>
import db from './firebaseInit'
export default {
    name:'dashboard',
    data(){
        return{
             products:[] ,
             search:''
        }
    },
     methods: {
     sortArrays(products) {
            return _.orderBy(products, 'name', 'asc');
        }
  },
    created ()  {
      db.collection('product').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
              console.log(doc.data())
              const data  = {
               'id': doc.id,
               'product_id': doc.data().product_id,
               'name': doc.data().name,
               'size': doc.data().size,
               'quantity':doc.data().quantity,
               'buyingPrice':doc.data().buyingPrice,
               'sellingPrice':doc.data().sellingPrice,
               'costPrice':doc.data().costPrice,

              }
              this.products.push(data)
          
          })
      }
      )
    },
    computed:{
        filteredProducts:function(){
            return this.products.filter((product)=>{
                return product.name.match(this.search)

            })
        }
   
    }

}
</script>

<style scoped>
th, td {
  padding: 5px;
  text-align: center;
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>