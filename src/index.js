import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';

const div = document.createElement('div');
div.id = 'root';
document.body.appendChild(div);

const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

const app = createApp(App);
app.use(store);
app.mount('#root');