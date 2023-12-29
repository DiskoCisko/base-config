<script setup>

defineProps({
    text: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'primary'
    },
    color: {
        type: String,
        default: ''
    }
});

</script>
<template>
    <button
        class="button"
        :class="type"
        v-bind="$attrs"
    >
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
.button {
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 0.75em;
    padding: 0.5em 1.1em;
    font-weight: 600;
    cursor: pointer;
    border-radius: 6px;
}

.button.primary {
    background-color: var(--additional-color);
    color: white;
}

.button.error {
    background-color: var(--error-color);
    color: white;
}

.button.secondary {
    background-color: var(--secondary-color);
    color: white;
}

.button:hover {
    opacity: 0.8;
    transition: 0.4;
}
.button:active {
    opacity: 0.2;
    transition: 0.4;
}

.button:disabled {
    opacity: 0.5;
    pointer-events: none;
}
</style>