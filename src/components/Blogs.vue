<template>
    <section>
        <div class="mb-8 flex items-end justify-between gap-4">
            <div>
                <p class="section-label"><span class="text-one-dark-blue">~/</span>writing</p>
                <h2 class="section-title">Notes &amp; articles</h2>
            </div>
            <a href="https://medium.com/@wahyuivan" target="_blank" rel="noopener noreferrer"
                class="link shrink-0 text-sm">All posts ↗</a>
        </div>
        <ul v-if="state === 'loading'" class="space-y-6 border-y border-one-dark-line py-5" aria-busy="true">
            <li v-for="n in 4" :key="n" class="skeleton h-5" :style="{ width: `${90 - n * 12}%` }"></li>
        </ul>
        <p v-else-if="state === 'error'" class="text-sm text-one-dark-foreground">
            Couldn't load posts from Medium.
            <a href="https://medium.com/@wahyuivan" target="_blank" rel="noopener noreferrer" class="link">Read them
                there</a>.
        </p>
        <ul v-else class="divide-y divide-one-dark-line border-y border-one-dark-line">
            <li v-for="blog in posts" :key="blog.link">
                <a :href="blog.link" target="_blank" rel="noopener noreferrer"
                    class="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span class="text-pretty font-medium transition-colors group-hover:text-one-dark-blue">
                        {{ decode(blog.title) }}
                    </span>
                    <span class="shrink-0 font-mono text-xs tabular-nums text-one-dark-foreground">
                        {{ formatDate(blog.pubDate) }}
                    </span>
                </a>
            </li>
        </ul>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchPosts } from "../lib/feeds.js";

const posts = ref([]);
const state = ref("loading");

// Medium titles arrive HTML-escaped (e.g. "&amp;")
const decode = (html) => new DOMParser().parseFromString(html, "text/html").documentElement.textContent;

const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });

onMounted(async () => {
    try {
        posts.value = await fetchPosts();
        state.value = posts.value.length ? "ok" : "error";
    } catch (error) {
        state.value = "error";
    }
});
</script>
