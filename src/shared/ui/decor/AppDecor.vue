<script setup>
import tel1 from '@/assets/images/tel1.png';
import tel2 from '@/assets/images/tel2.png';
import { computed, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ROUND_KEYS } from '@/models';
const route = useRoute();

const roundName = computed(() => route.params.id);

const videoSrc = computed(() => {
    switch (roundName.value) {
        case ROUND_KEYS.two:
            return 'https://diskocisko.ru/ny2024/2000.mp4';
        case ROUND_KEYS.three:
            return 'https://diskocisko.ru/ny2024/2010.mp4';
        case ROUND_KEYS.four:
                return 'https://diskocisko.ru/ny2024/2020.mp4';
        default:
            return 'https://diskocisko.ru/ny2024/1990.mp4';
    }
});

const videoKey = ref(0);

watch(videoSrc, () => {
    videoKey.value += 1;
});
</script>
<template>
    <div class="decor">
        <div class="decor__item right">
            <img :src="tel1" alt="">
            <video muted autoplay :key="videoKey">
                <source
                    :src="videoSrc"
                    :key="videoKey"
                    type="video/mp4" />
            </video>
        </div>
        <div class="decor__item left">
            <img :src="tel2" alt="">
            <video muted autoplay :key="videoKey">
                <source
                    :src="videoSrc"
                    type="video/mp4" />
            </video>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.decor {
    position: absolute;
    top: 0;
    right: 0;

    &__item {
        position: relative;
        top: 162px;
        

        img {
            position: absolute;
            height: 300px;
            z-index: 9999;
        }

        video {
            position: absolute;
            max-width: 270px;
            z-index: 999;
            top: 63px;
            left: 10px;
        }
    }

    &__item.right {
        right: 40vw;

        @media(min-width: 2500px) {
            top: 450px;
            right: 13vw;
        }
    }

    &__item.left {
        right: 20vw;

        @media(min-width: 2500px) {
            right: 13vw;
        }
    }
}
</style>