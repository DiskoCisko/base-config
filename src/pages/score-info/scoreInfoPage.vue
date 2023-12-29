<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { TeamsListWithGrade } from '@widgets';
import { AppButton } from '@shared/ui';
import { ROUTE_NAMES } from '@/route.js';
import { ROUND_KEYS } from '@/models';

const store = useStore();
const router = useRouter();

const handleResetGame = () => {
    store.dispatch('resetGame');

    router.push({
        name: ROUTE_NAMES.create
    });
};

const handleContinueGame = () => {
    store.dispatch('setMode', true);

    router.push({
        name: ROUTE_NAMES.round,
        params: {
            id: ROUND_KEYS.one
        }
    });
};
</script>

<template>
    <div class="score-info">
        <TeamsListWithGrade />
        <div class="button-group">
            <AppButton @click="handleContinueGame">Продолжить</AppButton>
            <AppButton @click="handleResetGame">Начать заново</AppButton>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.score-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 50%;
    min-height: 50vh;
    margin: 64px auto;
    font-size: 32px;

    @media(min-width: 2500px) {
        font-size: 40px;
    }

    .button-group {
        display: flex;
        justify-content: center;
        gap: 32px
    }
}
</style>