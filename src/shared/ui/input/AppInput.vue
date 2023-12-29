<script setup>
import { onBeforeMount, ref, toRefs, watch } from "vue";


const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    }
});

const { modelValue } = toRefs(props);

const inputValue = ref();

const emit = defineEmits(['update:modelValue']);

const handleChange = (e) => {
    inputValue.value = e.target.value;
  emit('update:modelValue', inputValue.value);
};

onBeforeMount(() => {
    inputValue.value = modelValue.value;
});

watch(modelValue, (value) => {
    inputValue.value = value;
});
</script>
<template>
    <div class="input-wrapper">
        <label>
            <span class="input-label">{{label}}</span>
            <input
                class="input"
                :value="inputValue"
                :class="type"
                :type="props.type"
                v-bind="$attrs"
                @input="handleChange"
            />
        </label>

    </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
    span, input {
        display: block;
    }
}

.input {
    width: 100%;
    outline: none;
    background-color: transparent;
    font-size: 0.75em;
    padding: 0.5em 1.1em;
    font-weight: 600;
    cursor: pointer;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    border-radius: 6px;
}
.input:active {
    opacity: 0.2;
    transition: 0.4;
}

.input:disabled {
    opacity: 0.5;
    pointer-events: none;
}

.input-label {
    padding-bottom: 8px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>