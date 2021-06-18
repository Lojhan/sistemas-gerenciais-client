<template>
    <section class="container mt-5">
        <h1 class="display-1">Minhas compras</h1>
        <section class="m-5">
              <DataTable 
                class="my-5" 
                :value="purchases" 
                :paginator="true" 
                :rows="10"
                @row-click="navigate"	
                >
  
      <Column field="uuid" header="ID"></Column>
        <Column field="purchased" header="Status" >
        <template #body="data">
          <p>{{ !data.data.purchased ? 'Aguardando pagamento' : 'Pago' }}</p>
        </template>
      </Column>
     
    </DataTable>
        </section>
    </section>
</template>

<script lang="ts">
import requests from '@/plugins/requests';
export default {
    data() {
        return {
            purchases: [] as any[],
        }
    },
    computed: {

    },
    mounted(){
      this.getData()
    },
    methods: {
       async getData() {
         try {
           const { data } = await requests.purchases()
           this.purchases = data
         } catch (e) {

         }
       },
      navigate(event: any) {
         console.log(event.data.uuid)
         this.$router.push('purchases/' + event.data.uuid)
       }
    }
}
</script>