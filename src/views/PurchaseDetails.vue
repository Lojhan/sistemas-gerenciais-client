<template>
    <div class="container mt-5" v-if="purchase">
        <div v-if="!purchase.purchased">
        <h4 class="my-4">Métodos de pagamento</h4>
            <TabView :activeIndex="active" @tab-change="changeTab">
                <TabPanel header="Cartão">
                    <div class="p-5">     
                        <v-credit-card @change="creditInfoChanged"/>
                        <button @click="payUsingCreditCard" class="btn btn-primary d-block w-100 my-5">Efetuar compra com cartão ( R${{ total }} )</button>
                    </div>
                </TabPanel>
                <TabPanel header="Boleto">
                    <div class="mt-5" v-if="active === 1 && !purchase.paymentTicket">
                        <h5>Nome para cobrança</h5>
                        <InputText class="w-100" type="text" v-model="data.clientName" />
                        <h5 class="mt-3">CPF</h5>
                        <InputMask mask="999.999.999-99" v-model="data.clientCPF" placeholder="999.999.999-99" />
                        <h5 class="mt-3">Telefone</h5>
                        <InputMask mask="(99) 99999-9999" v-model="data.clientPhone" placeholder="(99) 99999-9999" />
                        <button @click="payUsingNormalTicket" class="btn btn-primary d-block w-100 my-5">Efetuar compra com boleto ( R${{ total }} )</button>
                    </div>
                    <div v-else>
                        <h3 class="text-center my-3">Você já possui um boleto para essa compra</h3>
                        <button @click="showTicket" class="btn btn-primary d-block w-100 my-5">Exibir boleto</button>

                    </div>
                </TabPanel>
                <TabPanel header="Boleto Parcelado" >
                     <div class="mt-5" v-if="active === 2">
                        <h5>Nome para cobrança</h5>
                        <InputText class="w-100" type="text" v-model="data.clientName" />
                        <h5 class="mt-3">CPF</h5>
                        <InputMask mask="999.999.999-99" v-model="data.clientCPF" placeholder="999.999.999-99" />
                        <h5 class="mt-3">Telefone</h5>
                        <InputMask mask="(99) 99999-9999" v-model="data.clientPhone" placeholder="(99) 99999-9999" />
                        <h5 class="mt-3">Parcelas</h5>
                        <Dropdown v-model="data.installments" optionLabel="label" :options="options" placeholder="Selecione o número de parcelas" />
                        <button @click="payUsingMontlyTickets" class="btn btn-primary d-block w-100 my-5">Efetuar compra com boleto parcelado ( R${{ total }} )</button>

                    </div>
                </TabPanel>
            </TabView>
        </div>
        <div v-else>
            <h3 class="text-center">Pagamento já realizado</h3>
        </div>
     
        <Dialog header="Header" :visible.sync="display" >
            <div id="dialog">

            </div>
        </Dialog>
    </div>
</template>

<script>
import requests from '@/plugins/requests'
import Vue from 'vue'
import Swal from 'sweetalert2'

export default Vue.extend({
    data() {
        return {
            active: 0,
			display: false,
            purchase: {},
            cardValues: {},
            data: {
                clientName: '',
                clientCPF: '',
                clientPhone: '',
                value: 0,
                saleId: this.$route.params.id,
                installments: 0 
            },
            options: [] ,
            total: 0,
            items: [
                'Cartão',
                'Boleto',
                'Boleto Parcelado'
            ]
        }
    },
    methods: {
        async getData() {
            const { data } = await requests.purchase(this.$route.params.id)
            this.purchase = data

            let _total = 0;
            data?.relation?.forEach((e) => {
                _total += (+e.priceAtTime * e.quantity)
            })
            this.total = _total;
            this.data.value = _total;

            let _options = []
            for (let index = 0; index < 12; index++) {
            _options.push({times: index + 1, label: `${index + 1}x de R$${(_total / (index + 1)).toFixed(2)}`})
            }
            this.options = _options
        },
        creditInfoChanged(values) {
            this.cardValues = values; 
        },
        changeTab(payload) {
            this.active = this.items.indexOf(payload.tab.header)
        },
        async payUsingCreditCard() {
          const date = this.cardValues.expiration.split('/')
          try {  
            const { data } = await requests.pay({
                number: this.cardValues.cardNumber,
                securityCode: +this.cardValues.security,
                validityDate: {month: +date[0], year: +date[1]},
                cardHolder: this.cardValues.name,
                saleID: this.$route.params.id
                })
    await 
            Swal.fire(
            'Tudo certo!',
            'Os boletos serão enviados em seu e-mail!',
            'success'
            ).then(() => this.getData())
            } catch (e) {
                console.log(e);    
                Swal.fire(
            'Ops!',
            'Houve um erro ao processar o pagamento!',
            'error'
            )
            }
        },
        async payUsingMontlyTickets() {
          try {  
            this.data.installments = this.data.installments.times
            await requests.useMontlyTickets(this.data)

            await 
            Swal.fire(
            'Tudo certo!',
            'Os boletos serão enviados em seu e-mail!',
            'success'
            ).then(() => this.getData())
            } catch (e) {
                console.log(e);    
                Swal.fire(
            'Ops!',
            'Houve um erro ao processar o pagamento!',
            'error'
            )
            }
        },
        async payUsingNormalTicket() {
          try {  
            const { data } = await requests.insertTicket(this.data)
            await this.getData()
            // document.getElementById('dialog').innerHTML = data;
            var wnd = window.open("about:blank", "", "_blank");
            wnd.document.write(data)
            // this.display = true
            console.log(data)
            } catch (e) {
                console.log(e);    
                Swal.fire(
            'Ops!',
            'Houve um erro ao processar o pagamento!',
            'error'
            )
            }
        },
        async showTicket() {
            try {  
            const { data } = await requests.getTicket(this.purchase.paymentTicket)
            // document.getElementById('dialog').innerHTML = data;
            var wnd = window.open("about:blank", "", "_blank");
            wnd.document.write(data)
            // this.display = true
            console.log(data)
            } catch (e) {
                console.log(e);    
                Swal.fire(
            'Ops!',
            'Houve um erro ao processar o pedido!',
            'error'
            )
            }
        }
    },
    mounted() {
        this.getData()
    }
})
</script>