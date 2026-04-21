<script setup lang="ts">
defineProps<{ label?: string }>()

// const files = ref<File[]>([])
// const showAlert = ref(false)
// const text = ref('')
// const model = ref(new FormData())
// const path = defineModel<number>('path')
//
// const { send } = useRequest(() => UploadFile(model.value), {
//   initialData: inst(Media),
//   immediate: false,
// }).onSuccess(({ data }) => {
//   if (!data.id) {
//     files.value = []
//     text.value = (data as any).message
//     showAlert.value = true
//     return
//   }
//   showAlert.value = false
//   path.value = data.id
// })
//
// async function onUpload(x: File[]) {
//   if (!x.length) return
//   const body = new FormData()
//   for (let i = 0; i < x.length; i++) {
//     const element = x[i]
//     if (element) {
//       body.append('file', element)
//     }
//   }
//   model.value = body
//   send()
// }
</script>

<template>
  <!-- <div class="flexcol-md"> -->
  <!--   <VAlert v-if="!files.length && showAlert" :text="text" density="compact" type="warning" /> -->
  <!--   <VFileUpload v-model="files" @update:model-value="onUpload" density="compact" /> -->
  <!--   <VSpacer /> -->
  <!-- </div> -->
</template>
