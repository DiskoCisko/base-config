<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { AppButton, AppModalLayout } from '@shared/ui';

const store = useStore();

const currentQuestion = computed(() => store.state.current_question);

const isShowAnswer = ref(false);

const handleAnswer = (isRight) => {
    store.dispatch('handleAnswer', isRight);
};

</script>

<template>
    <AppModalLayout v-if="currentQuestion.entity">
        <div class="modal-wrap">
            <span class="modal__info">
                {{currentQuestion.score}}
            </span>
            <div>
                <h3 class="title">
                    {{currentQuestion.title}}
                </h3>
                <p>{{currentQuestion.text}}</p>
            </div>
            <div class="question__entity">
                <audio v-if="currentQuestion.type === 'audio'" controls>
                    <source :src="currentQuestion.entity" type="audio/mpeg" />
                </audio>
                <img v-else :src="currentQuestion.entity" alt="Tut risunok">
                <AppButton
                    v-if="!isShowAnswer"
                    class="entity__button"
                    @click="isShowAnswer = true"
                >
                    Показать ответ
                </AppButton>
                <h4 v-if="isShowAnswer">{{currentQuestion.answer}}</h4>
            </div>
            <div class="modal__control">
                <AppButton type="error" @click="handleAnswer(false)">
                    Неправильно
                </AppButton>
                <AppButton type="secondary" @click="handleAnswer(true)">
                    Правильно
                </AppButton>
            </div>
        </div>
    </AppModalLayout>
</template>

<style lang="scss" scoped>
.modal-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
    min-height: 50vh;
    max-width: 90vw;
    font-size: 28px;

    @media(min-width: 2500px) {
        font-size: 36px;
    }

    h3 {
        margin-top: 0;
        color: var(--additional-color);
    }

    h4 {
        color: var(--additional-color);
    }

    .modal__info {
        position: absolute;
        right: 16px;
        top: 16px;
    }

    img {
        max-height: 50vh;
    }
}

.entity__button {
    display: block;
    margin: 32px auto 0;
}

.modal__control {
    display: flex;
    justify-content: center;
    gap: 16px;
}
</style>