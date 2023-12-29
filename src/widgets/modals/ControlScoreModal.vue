<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { AppModalLayout, AppButton, AppInput } from '@shared/ui';

const store = useStore();

const isControlScoreMode = computed(() => store.state.control_score);
const teams = computed(() => store.state.teams);
const selectedTeam = ref();
const editedScore = ref(0);

const handleChangeScore = () => {
    store.dispatch('changeScore', {
        id: selectedTeam.value.id,
        editedScore: editedScore.value
    });

    selectedTeam.value = null;
    editedScore.value = 0;
};

const handleClose = () => {
    store.dispatch('toggleScoreModal');
};
</script>

<template>
    <AppModalLayout v-if="isControlScoreMode">
        <div class="content">
            <div v-if="!selectedTeam" class="select">
                <select v-model="selectedTeam">
                    <option v-for="team in teams" :key="team.id" :value="team">
                        <span>{{team.name}}</span>
                        -
                        <span>{{team.score}}</span>
                    </option>
                </select>
            </div>
            <div v-if="selectedTeam" class="score">
                <div>
                    <span>
                        {{selectedTeam.name}}   
                    </span>
                    -
                    <span>
                        {{selectedTeam.score}}   
                    </span>
                </div>

                <div class="score-control">
                    <input class="content-input" type="number" v-model="editedScore" />
                    <AppButton type="secondary" @click="handleChangeScore">
                        Применить
                    </AppButton>
                </div>
            </div>
            <AppButton type="error" @click="handleClose">
                Закрыть
            </AppButton>
        </div>
    </AppModalLayout>
</template>

<style lang="scss" scoped>
.content {
    font-size: 32px;
    min-width: 50vw;

    .select {
        margin: 32px 0;

        select {
            display: block;
            width: 100%;
            outline: none;
            background-color: transparent;
            font-size: 0.75em;
            padding: 0.5em 1.1em;
            font-weight: 600;
            cursor: pointer;
            border: 2px solid var(--primary-color);
            color: var(--primary-color);
            border-radius: 6px;
        }
    }



    option {
        border: 2px solid var(--primary-color);
        background-color: transparent;
    }

    .content-input {
        display: block;
        width: 150px;
        outline: none;
        background-color: transparent;
        font-size: 0.75em;
        padding: 0.5em 1.1em;
        font-weight: 600;
        cursor: pointer;
        border: 2px solid var(--primary-color);
        color: var(--primary-color);
        border-radius: 6px;
        text-align: center;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    .score {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
        padding: 16px 0;
        border-top: 2px solid var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        margin: 32px 0;
    }

    .score-control {
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 16px;
    }
}
</style>