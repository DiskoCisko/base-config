<script setup>
import { computed, onBeforeMount, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import { RoundRow, RoundTeams, QuestionModal, RoundModal, ControlScoreModal } from '@/widgets';
import { ROUTE_NAMES } from '@/route.js';
import { AppDecor } from '@shared/ui';
import { ROUND_NAMES } from "@/models";

const store = useStore();
const route = useRoute();
const router = useRouter();

const currentRound = computed(() => store.state.current_round);
const moveCount = computed(() => store.state.moveCount);
const isFreeMode = computed(() => store.state.free_mode);


const isShowRoundModal = ref(false);

onBeforeMount(() => {
    if (!currentRound.value.key) {
        store.dispatch('setCurrentRoundByKey', route.params.id);
    }
});

const closeModal = () => {
    isShowRoundModal.value = false;

    router.push({
        name: ROUTE_NAMES.round,
        params: {
            id: currentRound.value.key
        }
    })
}

watch(moveCount, (value) => {
    if (!value && !currentRound.value.isLast && !isFreeMode.value) {
        store.dispatch('nextRound');

        isShowRoundModal.value = true;

        if (currentRound.value) {
            router.push({
                name: ROUTE_NAMES.round,
                params: {
                    id: currentRound.value.key
                }
            });
        }


    }

    if (!value && currentRound.value?.isLast && !isFreeMode.value) {
        store.dispatch('finishGame');

        router.push({
            name: ROUTE_NAMES.score,
        })
    }
});
</script>

<template>
    <div class="round">
        <RoundTeams/>
        <AppDecor />
        <h2>
            {{ currentRound.name}}
        </h2>
        <div class="round-wrap">
            <ul>
                <RoundRow
                    v-for="(theme, index) in currentRound.themes"
                    :key="theme.name"
                    :theme="theme"
                    :indexTheme="index"
                />
            </ul>
        </div>
        <QuestionModal />
        <RoundModal v-if="isShowRoundModal" @click="closeModal"/>
        <ControlScoreModal />
    </div>
</template>
<style lang="scss" scoped>
.round {
    font-size: 24px;
    max-width: 90vw;
    margin: 0 auto;

    @media(min-width: 2000px) {
        max-width: 70vw;
        font-size: 32px;
    }
}
</style>