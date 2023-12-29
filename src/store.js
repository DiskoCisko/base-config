import { createStore } from 'vuex';
import { Team, Round, FORTUNA_KEYS } from '@/models';
import { fillRounds } from '@/db';

export const store = createStore({
    state () {
      return {
        teams: [],
        rounds: [],
        current_round: {},
        moveCount: 0,
        current_team: {},
        current_question: {},
        free_mode: false,
        control_score: false
      }
    },
    getters: {
      sortTeams: state => {
        const teams = state.teams;

        const sortTeams = teams.sort((a,b) => {
            if (a.score > b.score) {
                return -1;
            }
            if (a.score < b.score) {
                return 1;
            }

            return 0;
        })

        return sortTeams;
      }
    },
    mutations: {
      CREATE_TEAM (state, payload) {
        const id = state.teams.at(-1) ? state.teams.at(-1).id + 1 : 1;

        payload.id = id;

        state.teams.push(new Team(payload));

        localStorage.setItem('teams', JSON.stringify(state.teams));


      },
      DELETE_TEAM (state, id) {
        state.teams = state.teams.filter(team => team.id !== id);
        localStorage.setItem('teams', JSON.stringify(state.teams));
      },
      ADD_TEAM (state, team) {
        state.teams = state.teams.filter(item => item.id !== team.id);

        state.teams.push(new Team(team));
        localStorage.setItem('teams', JSON.stringify(state.teams));
      },
      SET_ROUNDS(state, rounds) {
        state.rounds = rounds.map((round, index) => {
          if (index === rounds.length - 1) {
            round.isLast = true;
          }
          return new Round(round);
        });

        localStorage.setItem('rounds', JSON.stringify(state.rounds));
      },
      SET_MOVE_COUNT(state) {
        state.moveCount = state.teams.length > 3 ? 5 : 6;
        localStorage.setItem('moveCount', state.moveCount);
      },
      SET_CURRENT_ROUND(state, round) {
        state.current_round = new Round(round);
        localStorage.setItem('current_round', JSON.stringify(state.current_round));
      },
      SET_CURRENT_TEAM(state, team) {
        state.current_team = team;
        localStorage.setItem('current_team', JSON.stringify(state.current_team));
      },
      SET_CURRENT_QUESTION(state, question) {
        state.current_question = question;
        localStorage.setItem('current_question', JSON.stringify(state.current_question));
      },
      ADD_SCORE(state, isRight) {
        const indexCurrentTeam = state.teams.findIndex(team => team.id === state.current_team.id);

        const score = state.teams[indexCurrentTeam].score;

        state.teams[indexCurrentTeam].score = isRight ? score + state.current_question.score : score - state.current_question.score;

        localStorage.setItem('teams', JSON.stringify(state.teams));
      },
      ADD_SCORE_FORTUNA(state, fortuna) {
        const indexCurrentTeam = state.teams.findIndex(team => team.id === state.current_team.id);
        switch(fortuna) {
          case FORTUNA_KEYS.nothing:
            return;
          case FORTUNA_KEYS.twice_all:
            state.teams = state.teams.map(team => {
              return {
                ...team,
                score: team.score * 2
              }
            });
            break;
          case FORTUNA_KEYS.twice_everything_except_yuo:
            state.teams = state.teams.map(team => {
              return {
                ...team,
                score: team.id === state.current_team.id ? team.score : team.score * 2
              }
            });
            break;
          case FORTUNA_KEYS.twice_only_you:
            state.teams[indexCurrentTeam].score = state.teams[indexCurrentTeam].score * 2;
            break;
          case FORTUNA_KEYS.zero_all:
            state.teams = state.teams.map(team => {
              return {
                ...team,
                score: 0
              }
            });
            break;
            case FORTUNA_KEYS.zero_everything_except_yuo:
              state.teams = state.teams.map(team => {
                return {
                  ...team,
                  score: team.id === state.current_team.id ? team.score : 0
                }
              });
              break;
            case FORTUNA_KEYS.zero_only_you:
              state.teams[indexCurrentTeam].score = 0;
          }

          localStorage.setItem('teams', JSON.stringify(state.teams));
      },
      NEXT_TEAM(state) {
        const indexCurrentTeam = state.teams.findIndex(team => team.id === state.current_team.id);

        if (! state.teams[indexCurrentTeam + 1]) {
          state.moveCount -= 1;

          state.current_team = state.teams[0];
        } else {
          state.current_team = state.teams[indexCurrentTeam + 1]
        }

        localStorage.setItem('current_team', JSON.stringify(state.current_team));
      },
      CLOSE_QUESTION(state) {
        const indexCurrentRound = state.rounds.findIndex(round => round.key === state.current_round.key);

        const rounds =  [...state.rounds];

        rounds[indexCurrentRound].themes[state.current_question.indexTheme].questions[state.current_question.indexQuestion].isComplete = true;
        rounds[indexCurrentRound].themes[state.current_question.indexTheme].questions[state.current_question.indexQuestion].color = state.current_team.color;

        state.rounds = rounds;

        state.current_round = rounds[indexCurrentRound];

        state.current_question = {}

        localStorage.setItem('rounds', JSON.stringify(state.rounds));
        localStorage.setItem('current_round', JSON.stringify(state.current_round));
        localStorage.setItem('current_question', JSON.stringify(state.current_question));
      },
      NEXT_ROUND(state) {
          const indexCurrentRound = state.rounds.findIndex(round => round.key === state.current_round.key);

          state.current_round = state.rounds[indexCurrentRound + 1];

          localStorage.setItem('current_round', JSON.stringify(state.current_round));
      },
      RESET_GAME(state) {
        state.rounds = [];
        state.teams = [];
        state.current_round = {};
        state.current_team = {};
        state.current_question = {};
        state.moveCount = 0;

        localStorage.clear();
      },
      SET_MODE(state, mode) {
        state.free_mode = mode;

        localStorage.setItem('free_mode', JSON.stringify(state.free_mode));
      },
      SET_GAME_PARAMS(state) {
        const rounds = localStorage.getItem('rounds');
        const teams = localStorage.getItem('teams');
        const current_round = localStorage.getItem('current_round');
        const current_team = localStorage.getItem('current_team');
        const current_question = localStorage.getItem('current_question');
        const moveCount = localStorage.getItem('moveCount');
        const free_mode = localStorage.getItem('free_mode');

        if (rounds && rounds !== 'undefined') {
          state.rounds = JSON.parse(rounds);
        }

        if (teams && teams !== 'undefined') {
          state.teams = JSON.parse(teams);
        }

        if (current_round && current_round !== 'undefined') {
          state.current_round = JSON.parse(current_round);
        }

        if (current_team && current_team !== 'undefined') {
          state.current_team = JSON.parse(current_team);
        }

        if (current_question && current_question !== 'undefined') {
          state.current_question = JSON.parse(current_question);
        }

        if (moveCount && moveCount !== 'undefined') {
          state.moveCount = JSON.parse(moveCount);
        }

        if (free_mode && free_mode !== 'undefined') {
          state.free_mode = JSON.parse(free_mode);
        }

      },
      CHANGE_SCORE(state, payload) {
        const indexTeam = state.teams.findIndex(team => team.id === payload.id);

        state.teams[indexTeam].score = state.teams[indexTeam].score + payload.editedScore;
      },
      TOGGLE_CONTROL_SCORE(state) {
        state.control_score = !state.control_score;
      }
    },
    actions: {
      createTeam({commit}, team) {
        commit('CREATE_TEAM', team)
      },
      deleteTeam({commit}, id) {
        commit('DELETE_TEAM', id)
      },
      addTeam({commit}, team) {
        commit('ADD_TEAM', team);
      },
      startGame({commit, state}) {
        const rounds = fillRounds();

        commit('SET_ROUNDS', rounds);
        commit('SET_CURRENT_ROUND', rounds[0]);
        commit('SET_MOVE_COUNT');
        commit('SET_CURRENT_TEAM', state.teams[0])
      },
      setCurrentRoundByKey({commit, state}, key) {
        const round = state.rounds.find(round => round.key === key);
        commit('SET_CURRENT_ROUND', round);
      },
      setCurrentQuestion({commit}, question) {
        commit('SET_CURRENT_QUESTION', question);
      },
      handleAnswer({commit}, isRight) {
        commit('ADD_SCORE', isRight);
        commit('CLOSE_QUESTION');
        commit('NEXT_TEAM');
      },
      handleFortuna({commit}, fortuna) {
        commit('ADD_SCORE_FORTUNA', fortuna);
        commit('CLOSE_QUESTION');
        commit('NEXT_TEAM');
      },
      nextRound({commit}) {
        commit('NEXT_ROUND');
        commit('SET_MOVE_COUNT');
      },
      resetGame({commit}) {
        commit('RESET_GAME');
      },
      setMode({commit}, mode) {
        commit('SET_MODE', mode);
      },
      setGameParams({commit}) {
        commit('SET_GAME_PARAMS');
      },
      changeScore({commit}, payload) {
        commit('CHANGE_SCORE', payload)
      },
      toggleScoreModal({commit}) {
        commit('TOGGLE_CONTROL_SCORE');
      }
    }
  })