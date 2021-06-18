<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link to="/">
                <a class="navbar-brand">Sistemas Corporativos Cliente</a>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav" :key="key">
                <li class="nav-item" v-for="(item, index) in items" :key="index">
                    <router-link :to="item.link" v-if="item.type === 'item' && item.roles.includes(store.role)">
                        <a class="nav-link">{{ item.name }}</a>
                    </router-link>
                    <template v-if="item.type === 'menu' && item.roles.includes(store.role)" >
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ store.username || item.name }}
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li v-show="_item.roles.includes(store.role)" class="nav-item ms-3" v-for="(_item, index) in item.children" :key="index">
                                    <router-link :to="_item.link" v-if="_item.type === 'item'">
                                        <a class="nav-link">{{ _item.name }}</a>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </template>
                    <template v-if="item.type === 'login' && item.roles.includes(store.role)" >
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ item.name }}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdownForm1">
                                <div class="px-3 py-2">
                                    <div class="form-group ">
                                    <label for="exampleDropdownFormEmail1" >Usuário</label>
                                    <input ref="username" type="email" class="form-control"  id="exampleDropdownFormEmail1" placeholder="user" />
                                    </div>
                                    <div class="form-group mt-3">
                                    <label for="exampleDropdownFormPassword1">Senha</label>
                                    <input ref="password" type="password" class="form-control"  id="exampleDropdownFormPassword1" placeholder="Password" />
                                    </div>
                                    <button @click="login"  class="btn btn-dark w-100 mt-3">Fazer login</button>
                                </div>
                                <div class="dropdown-divider"></div>
                                <button class="btn" routerLink="sign-up">Novo aqui? Crie seu perfil.</button>
                            </div>
                        </li>
                    </template>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            store: this.$store.getters,
            items: [
                { name: 'Produtos', link: '/products', type: 'item', roles: ['adm', 'user', 'client', 'undefined'] },
                { name: 'Login', link: '', type: 'login', roles: ['undefined'] },
                { name: this.$store.getters.username, link: '', type: 'menu', roles: ['adm', 'user', 'client'], 
                    children: [
                        { name: 'Carrinho', link: '/cart', type: 'item', roles: ['adm', 'user', 'client'] },
                        { name: 'Minhas compras', link: '/purchases', type: 'item', roles: ['adm', 'user', 'client'] },
                        { name: 'Sair', link: '/logout', type: 'item', roles: ['adm', 'user', 'client'] },
                        ],
                },
            ],
            state: this.$store.getters,
            key: 0
    };
  },
  methods: {
    login() {
      const { username, password } = this.$refs;
      this.$store.dispatch({
        type: "authenticate",
        user: username[0].value,
        password: password[0].value,
      });
    },
  },
})
</script>

<style>

a.nav-link,
a:link {
  text-decoration: none;
}

.dropdown-menu{ 
    width: 250px;
}
</style>