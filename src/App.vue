<script lang="ts" setup>
import axios from "axios";

axios.get("/api/apps/com.feelingtouch.idl/").then((res) => {
  console.log("res", res);
});
</script>

<template>
  <div class="container">App</div>
</template>

<style scoped lang="less"></style>
