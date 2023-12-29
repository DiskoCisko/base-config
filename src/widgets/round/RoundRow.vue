<script setup>
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { RoundQuestion } from '@widgets';

const store = useStore();

defineProps({
    theme: {
        type: Object,
        default: () => {}
    },
    indexTheme: {
        type: Number,
        default: 0
    }
});

const handleOpenQuestion = (question, indexTheme, indexQuestion) => {
    store.dispatch('setCurrentQuestion', {
        ...question,
        indexTheme,
        indexQuestion
    })
};
</script>

<template>
    <div class="round-row">
        <h3 class="round-row__title">
            {{ theme.name }}
        </h3>
        <ul class="question__wrap">
            <RoundQuestion
                v-for="(question, index) in theme.questions"
                :key="question.score"
                :question="question"
                @click="handleOpenQuestion(question, indexTheme, index)"
            />
        </ul>
    </div>
</template>
<style lang="scss" scoped>
.round-row {
    display: flex;
    margin-bottom: 32px;
    gap: 32px;
}

.question__wrap {
    display: flex;
    gap: 32px;
    align-items: center;
}

.round-row__title {
    width: 300px;
}
</style>