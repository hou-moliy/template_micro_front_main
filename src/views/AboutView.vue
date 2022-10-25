<template>
  <div class="about">
    <h4>This is an about page 主应用</h4>
    <h5>{{$store.state.userInfo.name}}</h5>
    <button @click="changeName">主应用点击改变name</button>
  </div>
</template>
<script>
export default {
  data () {
    return {};
  },
  methods: {
    changeName () {
      this.$store.commit("userInfo/changeName", "主应用点击改变名字：王麻子");
    },
  },
};
</script>
