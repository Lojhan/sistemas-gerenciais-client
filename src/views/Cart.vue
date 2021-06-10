<template>
    <section class="container mt-5">
        <h1 class="display-1">Carrinho</h1>
        <section class="m-5">
              <DataTable 
                class="my-5" 
                :value="cart" 
                :paginator="true" 
                :rows="10"
                >
  
      <Column field="product.product.name" header="Nome" sortable></Column>
      <Column field="quantity" header="Quantidade" sortable></Column>
        <Column field="listPrice" header="Valor" >
        <template #body="data">
          <p>R${{ data.data.product.inStockValue }}</p>
        </template>
      </Column>
      <Column field="total" header="Total" >
        <template #body="data">
          <p>R${{ (data.data.product.inStockValue * data.data.quantity).toLocaleString() }}</p>
        </template>
      </Column>
     
    </DataTable>
        </section>
        <h6 class="text-end">Total: {{ +total.toLocaleString() }}</h6>
        <button @click="buy" class="btn btn-primary d-block w-100 mt-5">Comprar</button>
    </section>
</template>

<script lang="ts">
import requests from '@/plugins/requests';
export default {
    data() {
        return {
            cart: this.$store.getters.cart as any[],
        }
    },
    computed: {
        total() {
            let _total = 0;
            this.cart.forEach((e: any) => {
                _total += (+e.product.inStockValue * e.quantity)
            })
            return _total;
        }
    },
    mounted(){
        // this.cart.forEach(e => console.log(e.product))
        // this.total = this.cart.reduce((a: any, b: any) => (+a.product.inStockValue * a.quantity) + (+b.product.inStockValue * b.quantity))
    },
     methods: {
       async buy() {
         try {
           const { data } = await requests.buy(this.cart)
           console.log(data)
         } catch (e) {

         }
       }
     }
}
</script>