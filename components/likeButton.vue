<template>
  <v-btn
    icon
    :color="isLike ? '' : 'pink'"
    :disabled="isLike"
    @click="addLike()"
  >
    <v-icon>mdi-heart</v-icon>
    [{{ viewCount }}]
  </v-btn>
</template>

<script>
export default {
  data () {
    return {
      viewCount: this.count,
      isLike: false
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  methods: {
    addLike() {
      if (this.isLike) return;

      this.$emit('addLike', { id: this.id, count: this.count });
      this.viewCount++;
      this.isLike = true;
    }
  }
}
</script>

<style lang="css">
.v-list-item {
  min-height: auto !important;
}
</style>
