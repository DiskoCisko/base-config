<script setup>
import { ref, watch } from "vue";
import { ColorPicker } from "vue3-colorpicker";

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
});

const emit = defineEmits(['update:modelValue']);

const pureColor = ref(props.modelValue ?? 'red');
watch(pureColor, (value) => {
    emit('update:modelValue', value);
});

</script>
<template>
    <div class="wrapper">
        <span class="label">
            {{label}}
        </span>
        <ColorPicker v-model:pureColor="pureColor"/>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 16px;
}
</style>