import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            isLoggedIn: false,
            userId: "",
        };
    },
    mutations: {
        login (state, userId) {
          state.isLoggedIn = true;
          state.userId = userId;
        }
      }
});
