<script setup lang="ts">
import '../styles/shared.css'

interface Product {
  title: string
  price: number
  thumbnail: string
  description: string
  category: string
  discountPercentage: number
  rating: number
  brand: string
}

defineProps<{
  product: Product
  isCompact?: boolean
}>()
</script>

<template>
  <div :class="['search-item', { 'search-item--compact': isCompact }]">
    <img :src="product.thumbnail" :alt="product.title" class="search-item__image" />
    <div class="flex flex-col gap-md search-item__content">
      <h3 class="font-bold">{{ product.title }}</h3>
      <p class="text-sm search-item__description">{{ product.description }}</p>
      <div class="flex gap-lg">
        <span class="text-sm font-medium discount">Discount {{ product.discountPercentage }}%</span>
        <span class="text-sm font-medium">{{ product.brand }}</span>
      </div>
      <div class="flex items-center gap-lg">
        <span class="text-sm font-bold">${{ product.price }}</span>
        <span class="text-sm warning">⭐{{ product.rating }}</span>
        <span class="badge primary text-xs">{{ product.category }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid var(--border-color);
}

.search-item:hover {
  background-color: #f5f5f5;
}

.search-item__image {
  border-radius: 4px;
  height: 200px;
  object-fit: contain;
}

.search-item--compact {
  height: 120px;
}

.search-item--compact .search-item__image {
  width: 90px;
  height: 90px;
  object-fit: cover;
}

.search-item__content {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.search-item__description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.primary {
  background-color: var(--primary-color);
}

.warning {
  color: var(--warning-color);
}

.discount {
  color: var(--danger-color);
}
</style>
