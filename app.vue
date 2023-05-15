<script setup lang="ts">
import { createClient } from '@supabase/supabase-js';

const data = ref('')
const error = ref('')

const callEdgeFunction = async () => {
  const supabase = useSupabaseClient()
  const { data: d, error: e } = await supabase.functions.invoke('access-postgres-without-jwt')
  data.value = JSON.stringify(d)
  error.value = JSON.stringify(e)
}

</script>

<template>
  <div>
    <button @click="callEdgeFunction">Call Edge Function</button>
    <p>
      <span>data: </span>
      <span>{{ data }}</span>
    </p>
    <p>
      <span>error: </span>
      <span>{{ error }}</span>
    </p>
  </div>
</template>