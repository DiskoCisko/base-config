<script setup>
import { AppInput } from '@shared/ui';
import { computed, ref } from 'vue';
import { AppColoPicker, AppButton } from '@shared/ui';
import { useStore } from 'vuex';

const store = useStore();

const teamName = ref('');
const teamColor = ref("red");

const resetTeam = () => {
    teamName.value = '';
    teamColor.value = 'red';
};

const handleAddTeam = () => {
    store.dispatch('createTeam', {
        name: teamName.value,
        color: teamColor.value
    });

    resetTeam();
};

const isDisabledCreate = computed(() => {
    return !teamName.value || !teamColor.value;
});

const isFreeMode = ref(false);

const handleFreeMode = (e) => {
    isFreeMode.value = e.returnValue;
    store.dispatch('setMode', isFreeMode.value);
};
</script>
<template>
    <div class="form">
        <h2>
            Создание команд
        </h2>
        <p>
            „Сила команды в каждом отдельном ее члене. <br/>Сила каждого отдельного члена в команде.“
        </p>
        <label>
            <input type="checkbox" :value="isFreeMode" @change="handleFreeMode">
            <span>Свободная игра</span>
        </label>
        <AppInput v-model="teamName" label="Название команды" />
        <AppColoPicker v-model="teamColor" label="Выберите цвет команды" />
        <AppButton :disabled="isDisabledCreate" @click="handleAddTeam" class="button">
            Добавить
        </AppButton>
    </div>
</template>
<style lang="scss" scoped>

.form {
    h2 {
        color: var(--primary-color);
    }

    button {
        margin-top: 32px;
    }

    p {
        font-size: 28px;
        font-style: italic;
        color: var(--light-color);

        @media(min-width: 2500px) {
            font-size: 36px;
        }
    }

    input {
        position: relative;
        width: 0;
        height: 0;
        outline: none;

        &::before {
            content: '';
            position: absolute;
            top: -24px;
            width: 24px;
            height: 24px;
            border: 1px solid var(--light-color);
            border-radius: 4px;
        }

        &:checked::before {
            content: '✓';
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            color: var(--light-color);

            @media(min-width: 2500px) {
                font-size: 26px;
            }
        }
    }

    label {
        display: block;
        margin-bottom: 32px;

        span {
            padding-left: 40px;
        }
    }
}
</style>