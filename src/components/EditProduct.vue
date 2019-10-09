<template>
    <div id="edit-product">
        <h3>Edit Product</h3>
         <div class="row">
            <form @submit.prevent="updateProduct" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                    
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="quantity" required>
          
                    </div>
                </div>
                 <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="buyingPrice" required>
          
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input  disabled type="text" v-model="product_id" required>
                  
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="costPrice" required>       
                    </div>
                </div>
                 <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="sellingPrice" required>
          
                    </div>
                </div>
                 <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="size" required>
                     
                    </div>
                </div>
                 <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="description" required>
          
                    </div>
                </div>
                
            <button type="submit" class="btn">Submit</button>
            <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div> 
</template>

<script>
import db from './firebaseInit'
export default {
    name:'edit-product',
    data(){
        return{
                  product_id:null,
          name:null,
          quantity:null,
          size:null ,
           buyingPrice:null,
          sellingPrice:null,
          costPrice:null,
          description:null  
        }
    },
    beforeRouteEnter(to,from,next){
        db.collection('product').where('product_id','==',to.params.product_id).get().then(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                next(vm  =>{
                    vm.product_id =doc.data().product_id
                    vm.name = doc.data().name
                    vm.quantity = doc.data().quantity
                    vm.size = doc.data().size
                })
            })
        })

    },
    watch:{
        '$route':'fetchData'
    },
    methods:{
        fetchData(){
            db.collection('product').where('product_id','==',this.$route.params.product_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.product_id =doc.data().product_id
                    this.name =doc.data().name
                    this.quantity=doc.data().quantity
                    this.size=doc.data().size
                })
            })
        },
        updateProduct(){
              db.collection('product').where('product_id','==',this.$route.params.product_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  doc.ref.update({
                      product_id: this.product_id,
                      name:this.name,
                      size: this.size,
                      quantity:this.quantity
                  }).then(() =>{
                      this.$router.push({name:'view-product',params:{product_id: this.product_id}})
                  })
                })
            })
        }
        
    }
}
</script>