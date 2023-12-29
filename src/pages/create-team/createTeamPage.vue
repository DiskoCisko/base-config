<script setup>
import { CreateTeamForm, CreateTeamList } from '@widgets';

</script>

<template>
    <div class="create-team">
        <CreateTeamForm />
        <hr/>
        <CreateTeamList />
    </div>
</template>
<style lang="scss" scoped>
.create-team {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 50%;
    min-height: 50vh;
    margin: 64px auto;
    font-size: 32px;

    @media(min-width: 2500px) {
        font-size: 40px;
    }

    hr {
        border: 2px solid var(--secondary-color);
        width: 100%;
    }
}
</style>