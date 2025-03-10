import { ref, computed } from 'vue'
import type { Ref } from 'vue'

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
}

export default function useProductSearch() {
  const products: Ref<Product[]> = ref([])
  const searchQuery = ref('')
  const loading = ref(false)
  const suggestionScrollIndex = ref(0)
  const suggestionItemHeight = 120

  const searchDebounced = (query: string) => {
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout)
    }
    window.searchTimeout = setTimeout(() => fetchProducts(query), 300)
  }

  const fetchProducts = async (query: string) => {
    if (!query.trim()) {
      products.value = []
      return
    }

    loading.value = true
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
      )
      const data = await response.json()
      products.value = data.products
    } catch (error) {
      console.error('Error fetching products:', error)
      products.value = []
    } finally {
      loading.value = false
    }
  }

  const visibleSuggestions = computed(() => {
    const start = Math.max(0, suggestionScrollIndex.value)
    return products.value.slice(start, start + 5).map((product) => ({
      ...product,
      uniqueKey: `${product.id}-${start}`,
    }))
  })

  const suggestionsHeight = computed(() => products.value.length * suggestionItemHeight)

  const handleSuggestionScroll = (scrollTop: number) => {
    suggestionScrollIndex.value = Math.max(
      0,
      Math.min(Math.floor(scrollTop / suggestionItemHeight), products.value.length - 5),
    )
  }

  return {
    searchQuery,
    loading,
    filteredProducts: products,
    visibleSuggestions,
    suggestionsHeight,
    handleSuggestionScroll,
    suggestionItemHeight,
    suggestionScrollIndex,
    searchDebounced,
  }
}
