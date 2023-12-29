<script setup>
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

defineProps({
    question: {
        type: Object,
        default: () => {}
    }
});
</script>

<template>
    <div
        class="round-question"
        :class="{completed: question.isComplete}"
        :style="{backgroundColor: question.isComplete ? question.color : 'inherit'}"
    >
        {{ question.score }}
    </div>
</template>
<style lang="scss" scoped>
.round-question {
    border: 1px solid var(--light-color);
    padding: 16px 32px;
    border-radius: 8px;
    font-size: 24px;

     @media(min-width: 2500px) {
        font-size: 32px;
    }
}

.round-question.completed {
    color: white;
    font-weight: 600;
    pointer-events: none;
    border: none;
}
</style>