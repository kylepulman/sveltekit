<script lang="ts">
  /* eslint svelte/no-at-html-tags: 'off' */
  import { goto } from "$app/navigation";
  import Home from "$lib/icons/home.svelte";

  export let data;
</script>

<svelte:head>
  <title>{data.metadata.title}</title>
  <meta name="description" content={data.metadata.description} />
</svelte:head>

<main class="prose mx-auto max-w-prose my-12 space-y-6 p-4">
  <header class="flex items-center justify-between">
    <button
      on:click={() => goto("/")}
      class="btn btn-circle"
    >
      <Home />
    </button>
    <div>
      <small>{new Date(data.metadata.createdAt).toLocaleString()}</small>
    </div>
  </header>
  {@html data.html}
</main>
