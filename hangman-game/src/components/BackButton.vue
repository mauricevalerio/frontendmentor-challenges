<template>
    <button class="btn-pink btn" @click="onBackClick">
        <img src="../assets/images/icon-back.svg" alt="Back Button" />
    </button>
</template>

<script>
export default {
    emits: ["onBack"],
    methods: {
        onBackClick() {
            this.$emit("onBack");
        }
    }
}
</script>