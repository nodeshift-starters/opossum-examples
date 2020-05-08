<template>
  <div>
    <button @click="makeRequest">Flakey Service</button>
    <button @click="clear">Clear</button>
  </div>
</template>

<script>
export default {
  name: 'ButtonList',
  methods: {
    makeRequest() {
      this.$emit('onRequest');
    },
    clear() {
      this.$emit('onClear');
    }
  }
};
</script>

<style>
button {
  box-shadow: inset 0px 1px 3px 0px #91b8b3;
  background: linear-gradient(to bottom, #768d87 5%, #6c7c7c 100%);
  background-color: #768d87;
  border-radius: 5px;
  border: 1px solid #566963;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 11px 23px;
  text-decoration: none;
  text-shadow: 0px -1px 0px #2b665e;
  outline: none;
  margin: 30px 10px 30px 0;
}
button:active {
  background: linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%);
  background-color: #6c7c7c;
}
</style>
