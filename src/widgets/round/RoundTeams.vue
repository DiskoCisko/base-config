<script setup>
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { RoundQuestion } from '@widgets';

const store = useStore();

const teams = computed(() => store.state.teams);
const currentTeam = computed(() => store.state.current_team);
const isFreeMode = computed(() => store.state.free_mode);

const moveCount = computed(() => store.state.moveCount);

const getCountText = computed(() => {
    if (!moveCount.value) return '';

    return moveCount.value !== 1 ? `Осталось ходов: ${moveCount.value}` : 'Последний ход';
});
</script>

<template>
    <div>
        <div class="round-row">
            <div
                v-for="team in teams"
                :key="team.name"
            >
                <h4
                    :style="{
                        color: team.color
                    }"
                    class="round-row__title"
                >
                    {{ team.name }}
                    <span>
                        {{team.score}}
                    </span>
                </h4>
            </div>
        </div>
        <div class="round-row">
            <span>
                Ход команды: 
            </span>
            <h4  :style="{
                color: currentTeam.color
            }">
                {{ currentTeam.name}}
            </h4>
            <span v-if="!isFreeMode" class="round-row__info">
                {{getCountText}}
            </span>
        </div>
    </div>

</template>
<style lang="scss" scoped>
.round-row {
    display: flex;
    align-items: center;
    gap: 16px;

    span {
        padding-right: 8px;
    }
}

.question__wrap {
    display: flex;
    gap: 32px;
    align-items: center;
}

.round-row__title {
    min-width: 200px;
}

.round-row__info {
    margin-left: 32px;
}
</style>