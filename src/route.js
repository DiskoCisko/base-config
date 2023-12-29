import { createRouter, createWebHashHistory } from 'vue-router'
import { createTeamPage, scoreInfoPage, roundPage } from '@pages';

export const ROUTE_NAMES = {
    create: 'create-team',
    score: 'score-info',
    round: 'round',
}

const routes = [
    { 
        path: '/create-team', 
        name: 'create-team', 
        component: createTeamPage 
    },
    { 
        path: '/score-info', 
        name: 'score-info', 
        component: scoreInfoPage 
    },
    { 
        path: '/round/:id', 
        name: 'round',
        params: {
            id: ''
        },
        component: roundPage 
    },
    { 
        path: '/:*', 
        redirect: () => {
            return { path: '/create-team' } }
    },
  ]
  
  export const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })