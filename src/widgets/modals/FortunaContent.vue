<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { AppButton } from '@shared/ui';
import { FORTUNA_NAMES, FORTUNA_KEYS } from '@/models';

const store = useStore();

const isShowRotateButton = ref(true);

const handleAnswer = () => {
    store.dispatch('handleFortuna', chosen.value);
};

const chosen = ref();

const rotateWheel = () => {
  isShowRotateButton.value = false;
  const wheel = document.querySelector('.fortuna__wrap');

  const deg = 720 + Math.ceil(Math.random() * 360);

  wheel.style.transform = `rotate(${deg}deg)`;
  wheel.style.transition = 'all 3s';
  wheel.style['transition-timing'] = 'ease-in-out';

  if ((deg - 720) < 48) {
    chosen.value = FORTUNA_KEYS.nothing;
    return;
  }

  if ((deg - 720) < 100) {
    chosen.value = FORTUNA_KEYS.twice_only_you;
    return;
  }

  if ((deg - 720) < 152) {
    chosen.value = FORTUNA_KEYS.twice_all;
    return;
  }

  if ((deg - 720) < 204) {
    chosen.value = FORTUNA_KEYS.twice_everything_except_yuo;
    return;
  }

  if ((deg - 720) < 256) {
    chosen.value = FORTUNA_KEYS.zero_only_you;
    return;
  }

  if ((deg - 720) < 308) {
    chosen.value = FORTUNA_KEYS.zero_all;
    return;
  }

  if ((deg - 720) < 360) {
    chosen.value = FORTUNA_KEYS.zero_everything_except_yuo;
    return;
  }
};

</script>

<template>
    <div class="modal-wrap">
        <div>
            <h3 class="title">
                Колесо фортуны
            </h3>
            <p>Раскрути и узнаешь, что будет</p>
            <AppButton
                v-if="isShowRotateButton"
                class="entity__button"
                type="secondary"
                @click="rotateWheel"
            >
                Раскрутить
            </AppButton>
        </div>
        <div class="question__entity">
            <div class="fortuna__arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g>
                        <polygon points="12 6.414 19.293 13.707 20.707 12.293 12 3.586 3.293 12.293 4.707 13.707 12 6.414"/>
                        <polygon points="3.293 18.293 4.707 19.707 12 12.414 19.293 19.707 20.707 18.293 12 9.586 3.293 18.293"/>
                    </g>
                </svg>
            </div>
            <ul class="fortuna__wrap">
                <li
                    v-for="(name, index) in FORTUNA_NAMES"
                    :key="name"
                    :class="`fortuna__item--${index}`"
                >
                    {{name}}
                </li>
            </ul>
        </div>
        <div class="modal__control">
            <AppButton type="secondary" @click="handleAnswer">
                Погнали дальше
            </AppButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 50vh;
    max-width: 90vw;
    min-width: 50vw;

    h3 {
        margin-top: 0;
        color: var(--additional-color);
    }

    .modal__info {
        position: absolute;
        right: 16px;
        top: 16px;
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

.fortuna__wrap {
  position: relative;
  width: 550px;
  height: 550px;
  margin: 32px auto;
  border-radius: 50%;
  border: 1px solid black;
  overflow: hidden;
  background-image: conic-gradient(
    #C12A32 52deg, 
    #0E3E18 52deg 104deg, 
    #214364 104deg 156deg,
    #0E3E18 156deg 208deg,
    #C12A32 208deg 260deg,
    #214364 260deg 312deg,
    #0E3E18 312deg 360deg,
  );
  color: var(--light-color);
  font-weight: 600;

  li {
     position: absolute;
     transform-origin: center right;
     max-width: 150px;
  }

  .fortuna__item--zero_everything_except_yuo {
    top: 16%;
    right: 24%;
    rotate: 26deg;
  }

  .fortuna__item--zero_all {
    top: 51%;
    right: 15%;
    rotate: 79deg;
  }

  .fortuna__item--zero_only_you {
    top: 75%;
    right: 31%;
    rotate: 127deg;
  }

  .fortuna__item--twice_everything_except_yuo {
    top: 76%;
    right: 64%;
    rotate: 183deg;
  }

  .fortuna__item--twice_all {
    top: 57%;
    right: 85%;
    rotate: 231deg;
  }

  .fortuna__item--twice_only_you {
    top: 22%;
    right: 80%;
    rotate: 286deg;
  }

  .fortuna__item--nothing {
    top: 5%;
    right: 54%;
    rotate: 333deg;
  }
}

.fortuna__arrow {
    position: relative;
    rotate: 180deg;
    transform: translateY(-45px);
    z-index: 999999999;

    svg {
        width: 50px;
        height: 50px;
    }
}
</style>