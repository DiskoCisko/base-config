<script setup>
import { computed, onBeforeMount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { ROUTE_NAMES } from '@/route.js';
import { AppButton, AppLight } from '@shared/ui';

const route = useRoute();
const router = useRouter();
const store =useStore();

const currentRound = computed(() => store.state.current_round);

const hasTeams = computed(() => !!store.state.teams?.length);
const isFreeMode = computed(() => store.state.free_mode);

const handleStart = () => {
    store.dispatch('startGame');

    router.push({
        name: ROUTE_NAMES.round,
        params: {
            id: currentRound.value.key
        },
    });
};

const handleNextRound = () => {
    if (currentRound.value.isLast) {
        store.dispatch('finishGame');

        router.push({
            name: ROUTE_NAMES.score,
        });
    } else {
        store.dispatch('nextRound');

        router.push({
            name: ROUTE_NAMES.round,
            params: {
                id: currentRound.value.key
            }
        });
    }
};

const handleResetGame = () => {
    router.push({
        name: ROUTE_NAMES.create,
    });
    store.dispatch('resetGame');
};

onBeforeMount(() => {
    store.dispatch('setGameParams');

    if (!hasTeams.value) {
        router.push({
            name: ROUTE_NAMES.create,
        });
    }
});
</script>
<template>
    <div class="wrapper">
        <AppLight />
        <div class="header">
            <h1>
                NY20<span>24</span>
            </h1>
            <div class="buttons-group">
                <AppButton
                    v-if="route.name === ROUTE_NAMES.create"
                    :disabled="!hasTeams"
                    @click="handleStart"
                >
                    К игре
                </AppButton>
                <AppButton
                    v-if="isFreeMode && route.name === ROUTE_NAMES.round"
                    @click="handleNextRound"
                >
                    Следующий раунд
                </AppButton>
                <AppButton
                    v-if="route.name !== ROUTE_NAMES.create"
                    type="error"
                    @click="handleResetGame"
                >
                    Начать заново
                </AppButton>
                <AppButton
                    v-if="route.name === ROUTE_NAMES.round"
                    @click="store.dispatch('toggleScoreModal')"
                >
                    Сраный Умный
                </AppButton>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<style lang="scss" scoped>
.wrapper {
    padding: 0 50px;
    position: relative;

    .header {
        display: flex;
        align-items: center;
        gap: 64px;
        font-size: 24px;
        padding-top: 75px;

        @media(min-width: 2500px) {
            font-size: 32px;
        }

        h1 {
            color: var(--primary-color);

            span {
                color: var(--error-color);
            }
        }

        .buttons-group {
            display: flex;
            gap: 32px;
        }
    }
}
</style>