<template>
  <NDialog v-model="dialog.show" :title="dialog.title" :content="dialog.content" @confirm="dialog.confirm" />
</template>
