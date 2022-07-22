<script setup>
const count = ref(0)

function handleClick() {
  count.value += 1
}
</script>

<template>
  <div>
    当前数值：{{ count }}
    <button @click="handleClick">
      点击+1
    </button>
  </div>
</template>
