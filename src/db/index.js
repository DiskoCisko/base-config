import { cavers } from '@/db/cavers';
import { back_and_forth } from '@/db/back_and_forth';
import { film } from '@/db/film';
import { serial } from '@/db/serial';
import { translate } from '@/db/translate';
import { voice } from '@/db/voice';

import { THEMES_NAMES, TYPES, ROUND_NAMES } from '@/models';

const themes = {
    cavers,
    back_and_forth,
    film,
    serial,
    translate,
    voice
};

const getQuestions = (round, theme) => {
    const db = themes[theme][round];

    const questions = [];

    Object.values(db).forEach(scoreGrade => {
        const randomIndex = Math.ceil(Math.random() * (scoreGrade.length - 1))

        questions.push(scoreGrade[randomIndex])
    })

    return questions;
}

const fillThemes = (round) => {
    const themes = [];
  
    Object.keys(TYPES).forEach((themeKey) => {
        const theme = {
        name: THEMES_NAMES[themeKey],
        questions: getQuestions(round, TYPES[themeKey])
      };
  
      themes.push(theme);
    })
  
    return themes;
  };

  const addFortuna = (themes) => {
    const randomThemeIndex = Math.ceil(Math.random() * themes.length - 1);
    const randomQuestionIndex = Math.ceil(Math.random() * themes[randomThemeIndex].questions.length - 1);

    themes[randomThemeIndex].questions[randomQuestionIndex].fortuna = true;

    return themes;
  }
  
  const fillRounds = () => {
    const rounds = [];
  
    Object.keys(ROUND_NAMES).forEach((key, index) => {
      const themes = fillThemes(key);

      const themesWithFortuna = addFortuna(themes);

      const round = {
        name: ROUND_NAMES[key],
        isBlocked: !!index,
        themes: themesWithFortuna,
        key
      };
  
      rounds.push(round);
    })
  
    return rounds;
  };

export {
    cavers,
    back_and_forth,
    film,
    serial,
    translate,
    voice,
    fillRounds
};