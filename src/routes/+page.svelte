<script lang="ts">
  import Megaphone from "$lib/icons/megaphone.svelte";
  import ArchiveBox from "$lib/icons/archive-box.svelte";
  import ChartBar from "$lib/icons/chart-bar.svelte";
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
</section>
