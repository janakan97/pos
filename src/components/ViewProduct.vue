<template>
    <div id="view-product">
            <ul class="collection with-header">
                <li class="collection-header"><h4>{{name}}</h4></li>
                <li class="collection-item"> Product ID {{product_id}}</li>
                <li class="collection-item">Quantity {{quantity}}</li>
                <li class="collection-item">Size {{size}}</li>
                <li class="collection-item">Description {{description}}</li>
            </ul>
            <router-link to='/' class="btn grey">Back</router-link>
            <button @click="deleteProduct" class="btn red">Delete</button>
           <div class="fixed-action-btn">
            <router-link  v-bind:to="{name:'edit-product',params:{product_id:product_id}}" class="btn-floating btn-large red">
            <i class="fa fa-pencil"></i>
            </router-link>
        </div> 
    </div> 
</template>

<script>
import db from './firebaseInit'
export default {
    name:'view-product',
    data(){
        return{
          product_id:null,
          name:null,
          quantity:null,
          size:null  ,
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
                    vm.description =doc.data().description
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
                    this.description=doc.data().description
                })
            })
        },
        deleteProduct(){
            if(confirm('Are you sure?')){
               db.collection('product').where('product_id','==',this.$route.params.product_id).get()
            .then(querySnapshot => {
               // console.log(doc.data.get())
                querySnapshot.forEach(doc => {
                   doc.ref.delete()
                   this.$router.push('/')
                })
            })
            }
        }
    }
}
</script>