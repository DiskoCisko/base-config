<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { AppButton, AppModalLayout } from '@shared/ui';

const store = useStore();

const currentRound = computed(() => store.state.current_round);
const sortTeams = computed(() => store.getters['sortTeams']);

const emit = defineEmits(['close']);

const close = () => {
    emit('close');
};

</script>

<template>
    <AppModalLayout>
        <div class="modal-wrap">
            <span>
                Следующий раунд:
            </span>
            <h4 class="title">
                {{currentRound.name}}
            </h4>
            <div>
                <ul>
                    <li v-for="team in sortTeams" :key="team.name" :style="{color: team.color}">
                        {{team.name}}: {{team.score}}
                    </li>
                </ul>
            </div>
            <AppButton @click="close">
                Погнали
            </AppButton>
        </div>
    </AppModalLayout>
</template>

<style lang="scss" scoped>
.modal-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 50vh;

    h4 {
        margin-top: 0;
    }
}

</style>