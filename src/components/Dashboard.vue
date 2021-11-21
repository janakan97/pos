<template>
    <div id="dashboard">
       <div class="row">
    <div class="col s12 m6 .xl12">
      <div class=" waves-dark btn-large green">
            <router-link to='/ProductInventory' > Product Management   </router-link>
        </div> 
    </div>
      <div class="col s12 m6 .xl12">
      <div class=" waves-dark btn-large green">
            <router-link to='/ProductInventory' >Cheque Maintaining   </router-link>
        </div> 
    </div>
  </div>
        <div class="row">
    <div class="col s12 m6 .xl12">
      <div class=" waves-dark btn-large green">
            <router-link to='/ProductInventory' >Billing   </router-link>
        </div> 
    </div>
     
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