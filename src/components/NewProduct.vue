<template>
    <div id="new-product">
        <h3>New Product</h3>
        <div class="row">
            <form @submit.prevent="saveProduct" class="col s12">
                    <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                        <label>Name</label>
                    </div>
                </div>
                 <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="quantity" required>
                        <label>Quantity  </label>
                    </div>
                </div>
                 <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="buyingPrice" required>
                        <label>Buying Price  </label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="product_id" required>
                        <label>Product ID#</label>
                    </div>
                </div>
                 <!-- <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="costPrice" required>
                        <label>Cost Price  </label>
                    </div>
                </div> -->
                 <!-- <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="sellingPrice" required>
                        <label>Selling Price  </label>
                    </div>
                </div> -->
                 <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="size" required>
                        <label> size</label>
                    </div>
                </div>
             
                <div class="textarea-field col s12">
                   <label> Description</label>  
                        <textarea v-model="description" required>
                                  
                        </textarea>
                         
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
    name:'new-product',
    data(){
        return{
               product_id:null,
          name:null,
          quantity:null,
          size:null ,
          buyingPrice:null,
          costPrice:null,
          sellingPrice:null,   
          description:null
                       }
    },
    methods:{
        saveProduct(){
            db.collection('product').add({
                product_id: this.product_id,
                name:this.name,
                size:this.size,
                quantity:this.quantity,
                buyingPrice:this.buyingPrice,
                costPrice:parseInt(this.buyingPrice*0.02)+parseInt(this.buyingPrice),
                sellingPrice:parseInt(this.buyingPrice*0.47)+parseInt(this.buyingPrice),
                description:this.description

            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
            
        }
    }
}
</script>