<script lang="ts">
  import ArchiveBox from "$lib/icons/archive-box.svelte";
  import BellAlert from "$lib/icons/bell-alert.svelte";
  import Megaphone from "$lib/icons/megaphone.svelte";

  export let data;
</script>

<section class="p-4 max-w-prose mx-auto my-12">
  <header class="prose text-center">
    <h1>Kyle P. Ulman</h1>
    <p>I use TypeScript to build cool stuff for the web.</p>
    <ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
      <li>
        <a href="{import.meta.env.VITE_BSKY_ORIGIN_URL}/profile/kylepulman.com">
          <Megaphone />
          Bluesky
        </a>
      </li>
      <li>
        <a href="https://github.com/kylepulman">
          <ArchiveBox />
          GitHub
        </a>
      </li>
    </ul>
  </header>
  <article class="space-y-4 my-6">
    {#each data.feed as post}
      {@const createdAt = new Date(post.createdAt)}
      <div class="card bg-base-100 shadow-xl card-side">
        <figure class="pl-8 flex-shrink-0">
          {#if post._source === "Bsky"}
            <Megaphone />
          {:else}
            <BellAlert />
          {/if}
        </figure>
        <div class="card-body">
          <small>{createdAt.toLocaleString()}</small>
          {#if post._source === "Bsky"}
            {@const postUriArray = post.uri.split("/")}
            <h2 class="card-title">{post.title}</h2>
            <a
              class="link mt-2 self-start dark:text-neutral-content/50 dark:hover:text-neutral-content/75 text-sm"
              href={`${import.meta.env.VITE_BSKY_ORIGIN_URL}/profile/${post._handle}/post/${postUriArray[postUriArray.length - 1]}`}
            >
              View on Bluesky
            </a>
          {:else}
            <h2 class="card-title">{post.title}</h2>
            <a
              class="link mt-2 self-start dark:text-neutral-content/25 dark:hover:text-neutral-content/75 text-sm"
              href={post.uri}
            >
              {post.uri}</a
            >
          {/if}
        </div>
      </div>
    {/each}
  </article>
</section>
