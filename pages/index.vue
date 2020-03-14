<template>
  <div>
    <div class="text-center">
      <nuxt-link to="/new">
        <v-btn
          color="primary"
          @click="dialog = false"
        >
          新規作成
        </v-btn>
      </nuxt-link>
    </div>

    <br />

    <v-simple-table dense fixed-header height="80vh">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">題名</th>
            <th class="text-left">0歳</th>
            <th class="text-left">0歳</th>
            <th class="text-left">1歳</th>
            <th class="text-left">1歳</th>
            <th class="text-left">1歳</th>
            <th class="text-left">乳児F</th>
            <th class="text-left">2歳</th>
            <th class="text-left">2歳</th>
            <th class="text-left">2歳F</th>
            <th class="text-left">3歳</th>
            <th class="text-left">3歳F</th>
            <th class="text-left">4歳</th>
            <th class="text-left">幼児F</th>
            <th />
            <th>いいね</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, id) in items" :key="id">
            <td>{{ item.title }}</td>
            <td v-for="index in range" :key="index">
              {{ item.users[index] }}
            </td>
            <td>
              <nuxt-link :to="`/edit?id=${id}`" class="button">
                <v-btn
                  color="success"
                  small
                >
                  編集
                </v-btn>
              </nuxt-link>
              <v-btn
                color="error"
                small
                @click="deleteItem(id)"
                class="button"
              >
                削除
              </v-btn>
            </td>
            <td>
              <LikeButton :id="id" :count="item.like" @addLike="addLike" />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase.js";
import LikeButton from '~/components/likeButton.vue';

export default {
  components: { LikeButton },
  computed: {
    items() {
      return this.$store.getters['items'];
    },
    range() {
      return Array.from(Array(13).keys());
    }
  },
  mounted() {
    this.$store.dispatch('initItems');
  },
  methods: {
    deleteItem(id) {
      this.$store.dispatch('deleteItem', id);
    },
    addLike(param) {
      firebase.analytics().logEvent('eventName', { property: 'propertyName' })
      this.$store.dispatch('addLike', param);
    }
  }
}
</script>

<style lang="css">
.button {
  display: block;
  margin: 4px 0;
}
</style>
