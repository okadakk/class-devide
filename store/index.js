import Vue from 'vue';
import firebase from "~/plugins/firebase.js";
const db = firebase.firestore();

export const state = () => ({
  users: [
    '先生A',
    '先生B',
    '先生C',
    '先生D',
    '先生E',
    '先生F',
    '先生G',
    '先生H',
    '先生I',
    '先生J',
    '先生K',
    '先生L',
    '先生M'
  ],
  selectedUsers: {},
  items: {},
  title: ''
});

export const getters = {
  title (state) {
    return state.title;
  },
  items (state) {
    return state.items;
  },
  canSelectUsers (state) {
    const selectUserArray = Object.keys(state.selectedUsers).map(i => state.selectedUsers[i]);
    return state.users.filter(user => !selectUserArray.includes(user));
  },
  selectedUsers (state) {
    return state.selectedUsers;
  }
};

export const mutations = {
  setTitle(state, title) {
    state.title = title;
  },
  addItem (state, param) {
    Vue.set(state.items, param.id, param.item);
  },
  removeItem (state, id) {
    Vue.delete(state.items, id);
  },
  resetItems (state) {
    state.items = {};
  },
  setSelectedUsers(state, users) {
    state.selectedUsers = users;
  },
  addSelectedUsers (state, param) {
    Vue.set(state.selectedUsers, param.index, param.name);
  },
  async saveSelectedUsers (state) {
    await db.collection('items').add({
      title: state.title,
      users: state.selectedUsers,
      like: 0
    });
  },
  async updateSelectedUsers (state, id) {
    await db.collection('items').doc(id).update({
      title: state.title,
      users: state.selectedUsers
    });
  },
  resetInput (state) {
    state.selectedUsers = {};
    state.title = '';
  }
}

export const actions = {
  initItems (context) {
    context.commit('resetItems');

    db.collection("items").orderBy("like", "desc").get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          context.commit('addItem', {
            id: doc.id,
            item: doc.data()
          });
        });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
  },
  fetchItem (context, id) {
    db.collection("items").doc(id).get()
      .then(doc => {
        const data = doc.data();
        context.commit('setTitle', data.title);
        context.commit('setSelectedUsers', data.users);
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
  },
  deleteItem (context, id) {
    context.commit('removeItem', id);

    db.collection("items").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  },
  async addLike(context, param) {
    await db.collection('items').doc(param.id).update({
      like: param.count + 1
    });
  }
}
