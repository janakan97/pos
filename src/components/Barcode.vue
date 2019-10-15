<template>
    <div id="barcode-product">

      <div id="printMe">
      <div>
            {{sellingPrice}}
              {{costPrice}}  
      </div>
  <barcode  v-model="product_id" :options="{ displayValue: true }" tag="img" > 
       
  </barcode>

 
          
       </div>
    <div>
                  <button @click="print">PRINT</button>
    </div>
    </div> 
   
</template>

<script >
import db from './firebaseInit'


export default {
    name:'barcode-product',
    data(){
        return {
        product_id:null,
        sellingPrice:null,
        costPrice:null,
      //  costPricecode:encoding(costPrice) 
    }

}
,
    beforeRouteEnter(to,from,next){
        db.collection('product').where('product_id','==',to.params.product_id).get().then(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                next(vm  =>{
                    vm.product_id =doc.data().product_id
                    vm.sellingPrice=doc.data().sellingPrice
                    vm.costPrice=doc.data().costPrice
                    //   console.log(vm.product_id)
                })
            })
        })
    

    },
    methods:{
   print() {
      // Pass the element id here
      this.$htmlToPaper('printMe');
    },
    encoding(x){
    console.log(costPrice)
    }
    },
      created ()  {
   // console.log(costPrice)
    }


}
</script>