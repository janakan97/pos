<template>
    <div id="barcode-product">
     
  <barcode  v-model="product_id" :options="{ displayValue: false }"> </barcode>
              {{product_id}}
              {{sellingPrice}}
              {{costPrice}}
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
        costPrice:null
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
                       console.log(vm.product_id)
                })
            })
        })

    },
    methods:{
    encoding(){
this.costPrice=150
  }
    }


}
</script>