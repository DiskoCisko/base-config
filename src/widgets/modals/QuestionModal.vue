<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { AppModalLayout } from '@shared/ui';
import FortunaContent from './FortunaContent.vue';
import TaskContent from './TaskContent.vue';

const store = useStore();

const currentQuestion = computed(() => store.state.current_question);

</script>

<template>
    <AppModalLayout v-if="currentQuestion.entity">
        <FortunaContent v-if="currentQuestion.fortuna" />
        <TaskContent v-else />
    </AppModalLayout>
</template>

<style lang="scss" scoped>
</style>