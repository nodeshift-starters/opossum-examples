<template>
  <div>
    <p
      v-for="(element, index) in list.slice().reverse()"
      :key="index"
      :class="element.state.toLowerCase()"
    >
      <span>{{ element.state }} </span>
      <span>{{ element.body }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ResponseList',
  props: ['list']
};
</script>

<style>
.clear {
  cursor: pointer;
  color: #3336ff;
}
.success {
  color: darkgreen;
}
.open {
  color: red;
}
.fallback {
  color: darkblue;
}
.rejected {
  color: darkorange;
}
.close {
  color: green;
}
.timeout {
  color: darksalmon;
}
</style>
