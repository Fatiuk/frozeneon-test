<script setup lang="ts">
import ProductSearchItem from './ProductSearchItem.vue'
import useProductSearch from '../composables/useProductSearch'

const {
  searchQuery,
  loading,
  filteredProducts,
  visibleSuggestions,
  suggestionsHeight,
  handleSuggestionScroll,
  suggestionItemHeight,
  suggestionScrollIndex,
  searchDebounced,
} = useProductSearch()

const onSuggestionScroll = (event: Event) => {
  const target = event.target as HTMLElement
  handleSuggestionScroll(target.scrollTop)
}

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  searchQuery.value = value
  searchDebounced(value)
}
</script>

<template>
  <div class="search">
    <input
      :value="searchQuery"
      @input="onInput"
      placeholder="Search products..."
      class="search__input"
    />

    <div v-show="searchQuery || loading" class="search__dropdown" @scroll="onSuggestionScroll">
      <div v-if="loading" class="search__loading">Loading...</div>
      <div v-else-if="!filteredProducts.length" class="search__no-results">No results found</div>
      <div v-else class="search__virtual-list" :style="{ height: `${suggestionsHeight}px` }">
        <div
          class="search__viewport"
          :style="{
            transform: `translateY(${suggestionScrollIndex * suggestionItemHeight}px)`,
            position: 'absolute',
            width: '100%',
          }"
        >
          <ProductSearchItem
            v-for="product in visibleSuggestions"
            :key="product.uniqueKey"
            :product="product"
            is-compact
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search {
  position: relative;
  max-width: 600px;
  margin: 20px auto;
}

.search__input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search__dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  max-height: 350px;
  overflow-y: auto;
  color: black;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.search__virtual-list {
  position: relative;
  overflow: hidden;
  will-change: transform;
}

.search__viewport {
  will-change: transform;
  backface-visibility: hidden;
}

.search__loading,
.search__no-results {
  padding: 1rem;
  text-align: center;
  color: #666;
}
</style>
