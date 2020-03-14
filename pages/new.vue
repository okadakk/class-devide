<template>
  <div>
    <v-text-field
      v-model="title"
      label="題名"
      required
    ></v-text-field>

    <v-list subheader three-line>
      <v-subheader>0歳</v-subheader>
      <Selector :text="selectedUsers[0]" :index="0" />
      <Selector :text="selectedUsers[1]" :index="1" />

      <v-subheader>1歳</v-subheader>
      <Selector :text="selectedUsers[2]" :index="2" />
      <Selector :text="selectedUsers[3]" :index="3" />
      <Selector :text="selectedUsers[4]" :index="4" />

      <v-subheader>乳児F</v-subheader>
      <Selector :text="selectedUsers[5]" :index="5" />

      <v-subheader>2歳</v-subheader>
      <Selector :text="selectedUsers[6]" :index="6" />
      <Selector :text="selectedUsers[7]" :index="7" />

      <v-subheader>2歳/フリー</v-subheader>
      <Selector :text="selectedUsers[8]" :index="8" />

      <v-subheader>3歳</v-subheader>
      <Selector :text="selectedUsers[9]" :index="9" />

      <v-subheader>3歳F</v-subheader>
      <Selector :text="selectedUsers[10]" :index="10" />

      <v-subheader>4歳</v-subheader>
      <Selector :text="selectedUsers[11]" :index="11" />

      <v-subheader>幼児F</v-subheader>
      <Selector :text="selectedUsers[12]" :index="12" />
    </v-list>

    <div class="text-center">
      <nuxt-link to="/">
        <v-btn
          color="primary"
          @click="dialog = false"
        >
          戻る
        </v-btn>
      </nuxt-link>

      <v-btn
        color="success"
        @click="register"
      >
        登録
      </v-btn>
    </div>
  </div>
</template>

<script>
import Selector from '~/components/selector.vue';

export default {
  components: { Selector },
  computed: {
    title: {
      get () {
        return this.$store.getters['title'];
      },
      set (value) {
        this.$store.commit('setTitle', value)
      }
    },
    selectedUsers() {
      return this.$store.getters['selectedUsers'];
    }
  },
  mounted() {
    this.$store.commit('resetInput');
  },
  methods: {
    async register() {
      await this.$store.commit('saveSelectedUsers');
      this.$router.push('/');
    }
  }
}
</script>
