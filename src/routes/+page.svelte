<script lang="ts">
  import Megaphone from "$lib/icons/megaphone.svelte";
  import ArchiveBox from "$lib/icons/archive-box.svelte";
  import ChartBar from "$lib/icons/chart-bar.svelte";

  export let data;
</script>

<section class="p-4 max-w-prose mx-auto my-12">
  <header class="prose text-center">
    <h1>Kyle P. Ulman</h1>
    <p>I use TypeScript to build cool stuff for the web.</p>
    <ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
      <li>
        <a href="https://bsky.app/profile/kylepulman.bsky.social">
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
      <li>
        <a href="https://www.codewars.com/users/kylepulman">
          <ChartBar />
          Codewars
        </a>
      </li>
    </ul>
  </header>
  <article class="space-y-4 my-6">
    {#each data.feed as post}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <small>{new Date(post.createdAt).toLocaleString()}</small>
          <h2 class="card-title">{post.text}</h2>
          <a class="link mt-2 self-start text-neutral-content/25 hover:text-neutral-content/75 text-sm" href="{post.uri}">View on Bluesky</a>
        </div>
      </div>
    {/each}
  </article>
</section>
