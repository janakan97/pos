<template>
    <div id="barcode-product">

      <div id="printMe">
      <div>
            Rs.{{sellingPrice}}
           - MPVS
             - {{encoding(this.costPrice)}}  -
      </div>
  <barcode  v-model="product_id" :options="{ displayValue: true }" tag="img" > 
       
  </barcode>

 
          
       </div>
    <div>
                  <button v-on:click="print">PRINT</button>
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
      costPricecode:null
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
        encoding:function (x){

            var code=" "
            var i
            for (i = 0; i < 5; i++) {
                // console.log(x[i])
                //   code += 'T' + " "
                switch(x[i]) 
                {
                        case '1': 
                          code += 'T' + " "
                          break
                        case '2': 
                          code += 'I' + " "  
                          break 
                        case '3': 
                          code += 'G' + " "
                          break
                        case '4': 
                          code += 'E' + " "
                          break
                        case '5': 
                          code += 'R' + " " 
                          break  
                        case '6': 
                          code += 'M' + " "
                          break
                        case '7': 
                          code += 'O' + " "
                          break
                        case '8': 
                          code += 'H' + " "
                          break
                        case '9': 
                          code += 'A' + " "
                          break
                        case '0': 
                          code += 'N' + " "
                          break
                }
             
            }
            return code;
    },
   print() {
       
      // Pass the element id here
      this.$htmlToPaper('printMe');
    }
    },
      created ()  {
   // console.log(costPrice)
    }
 

}
</script>