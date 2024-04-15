<template>
    <template v-if="!store.hasGameStarted">
        <section class="sections">
            <div class="component-headers">
                <back-button @onBack="store.toggleCategories()"></back-button>
                <h2 class="component-headers-text">Pick a Category</h2>
            </div>

            <div class="categories">
                <template v-for="(_, key) in store.categoriesData">
                    <button class="btn btn-categories" :disabled="checkRemainingWords(key)" @click="() => getCurrentCategory(key)">
                        {{ key }}
                    </button>
                    
                </template>
            </div>
        </section>
    </template>
    
    <hangman v-else></hangman>
</template>

<script>
import { store } from "../store.js"
import Hangman from './Hangman.vue'
import BackButton from './BackButton.vue'

export default {
    components: { Hangman, BackButton },
    data() {
        return {
            store
        }
    },
    methods: {
        getCurrentCategory(chosenCategory) {
            store.getAvailableWords(chosenCategory)
            store.toggleGameStarted()
            store.updateSelected()
        },
        checkRemainingWords(category) {
            return store.categoriesData[category].filter(categoryItem => !categoryItem.selected).length === 0
        }
    }
}
</script>

<style scoped>
    .categories {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
        justify-content: center;
    }

    .btn-categories {
        background: var(--clr-secondary);
        border-radius: var(--rounded-xs);
    }

    @media (min-width: 768px) {
        .btn-categories {
            padding: 2rem;
        }
    }
</style>