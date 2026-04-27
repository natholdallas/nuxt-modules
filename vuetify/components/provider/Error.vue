<script setup lang="ts">
import { useError, navigateTo } from 'nuxt/app'

const error = useError()
</script>

<template>
  <div class="vhc">
    <div class="flex flex-col justify-center">
      <VEmptyState
        v-if="error?.status === 404"
        headline="Whoops, 404"
        title="Page not found"
        text="The page you were looking for does not exist"
        image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
      />
      <VEmptyState
        v-else-if="error?.status === 403"
        headline="Forbidden Page"
        title="Check back later."
        text="You can't received any messages in this page."
        image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
      />
      <VEmptyState
        v-else-if="error?.status === 500"
        headline="Internal Server Error"
        title="Check back later."
        text="You received the server error, please contact us to fix the issue."
        image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
      />
      <VEmptyState
        v-else
        headline="An error occurred"
        title="unknown error, we are working on it"
        text="Please try again later"
        image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
      />
      <VBtn text="Go Back" @click="navigateTo({ name: 'index' })" />
    </div>
  </div>
</template>
