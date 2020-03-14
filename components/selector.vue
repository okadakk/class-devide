<template>
  <div>
    <v-list-item>
      <v-list-item-content @click="dialog = true">
        <v-list-item-title>{{ text ? text : '未設定' }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-list subheader three-line>
        <v-subheader>選択</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="user in users" :key="user">
            <v-list-item-content @click="select(user)">
              <v-list-item-title>{{ user }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content @click="select(null)">
              <v-list-item-title>未設定</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-btn
        color="primary"
        @click="dialog = false"
      >
        Back
      </v-btn>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
    }
  },
  props: {
    text: {
      type: String,
      required: false,
      default: '未設定'
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    users() {
      return this.$store.getters['canSelectUsers'];
    }
  },
  methods: {
    select(user) {
      this.$store.commit('addSelectedUsers', { name: user, index: this.index});
      this.dialog = false;
    }
  }
}
</script>

<style lang="css">
.v-list-item {
  min-height: auto !important;
}
</style>
