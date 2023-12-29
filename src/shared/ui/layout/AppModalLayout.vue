<script setup>
</script>

<template>
    <div class="modal-background">
        <div class="modal-wrap">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: rgba(14, 31, 5, 0.781);
}

.modal-wrap {
    position: relative;
    text-align: center;
    padding:64px;
    background-color: var(--light-color);
    font-size: 24px;
    color: var(--secondary-color);

    @media(min-width: 2500px) {
        font-size: 32px;
    }
}
</style>