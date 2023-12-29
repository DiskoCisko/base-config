<script setup>
import { computed, ref } from 'vue';
import { AppColoPicker, AppButton, AppInput } from '@shared/ui';
import { useStore } from 'vuex';

const store = useStore();

const teams = computed(() => store.state.teams);
const edited = ref({});



const handleChange = (team) => {
    edited.value = { ...team };
};

const handleDelete = (id) => {
    store.dispatch('deleteTeam', id)
};

const handleSave = () => {
    store.dispatch('addTeam', edited.value);
    edited.value = {};
};

const handleCancel = () => {
    edited.value = {};
};
</script>
<template>
    <div class="team-list">
        <h3>
            Список команд
        </h3>
        <ul v-if="teams.length">
            <li v-for="team in teams" :key="team.id" class="team-list__wrap">
                <div class="team-list__item" v-if="edited.id !== team.id">
                    <span :style="{
                        color: team.color
                    }">
                        {{ team.name }}
                    </span>
                    <div class="team-list__btn-group">
                        <AppButton @click="handleChange(team)">
                            Изменить
                        </AppButton>
                        <AppButton type="error" @click="handleDelete(team.id)">
                            Удалить
                        </AppButton>
                    </div>
                </div>
                <div v-else>
                    <AppInput v-model="edited.name" label="Название команды" />
                    <AppColoPicker v-model="edited.color" label="Выберите цвет команды" />
                    <div class="team-list__btn-group">
                        <AppButton @click="handleSave">
                            Сохранить
                        </AppButton>
                        <AppButton type="error" @click="handleCancel">
                            Отменить
                        </AppButton>
                    </div>
                </div>
                <hr class="divider" :style="{borderColor: team.color}"/>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
button {
    margin-top: 32px;
}

.team-list__btn-group {
    display: flex;
    gap: 16px;
}

.team-list__wrap {
    margin-bottom: 32px;
}

.team-list__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 40vw;
    gap: 32px;

    span {
        display: block;
        padding-top: 24px;
    }
}

.divider {
    width: 100%;
    border: 1px solid #fff;
}
</style>