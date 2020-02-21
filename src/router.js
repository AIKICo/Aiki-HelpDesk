import VueRouter from 'vue-router'
import cartabl from './components/tickets/cartabl'
const routes= [
    {name:'cartabl', path:'/cartabl', component: cartabl}
]

const router=new VueRouter({
    mode:'history',
    routes:routes
});

export default router;