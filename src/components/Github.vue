<template>
    <section>
        <div class="mb-8 flex items-end justify-between gap-4">
            <div>
                <p class="section-label"><span class="text-one-dark-blue">~/</span>open-source</p>
                <h2 class="section-title">Things I build in public</h2>
            </div>
            <a href="https://github.com/Whyu9-9" target="_blank" rel="noopener noreferrer"
                class="link shrink-0 text-sm">GitHub ↗</a>
        </div>
        <!-- Client-only: prerendered it's ~100 KB of empty cells; min-h holds its 197px so nothing shifts -->
        <div class="card no-scrollbar mb-4 hidden min-h-[197px] w-full justify-center overflow-scroll p-6 md:flex">
            <ActivityCalendarWidget v-if="mounted" :data="convertedData" :daysToRender="daysToRender" :levelColors="levelColors"
                tooltipBgColor="#21252b" />
        </div>
        <div class="grid gap-4 md:grid-cols-2">
            <template v-if="state === 'loading'">
                <div v-for="n in 4" :key="n" class="skeleton h-32 rounded-xl"></div>
            </template>
            <p v-else-if="state === 'error'" class="text-sm text-one-dark-foreground">
                Couldn't load repositories from GitHub.
            </p>
            <template v-else>
            <a v-for="repo in repos" :key="repo.html_url" :href="repo.html_url" target="_blank"
                rel="noopener noreferrer" class="card-link group flex flex-col justify-between p-5">
                <div>
                    <h3 :class="[
                        'font-mono text-sm font-medium transition-colors group-hover:text-one-dark-blue',
                        repo.archived && 'line-through',
                    ]">
                        {{ repo.name }}
                    </h3>
                    <p class="mt-2 text-sm leading-relaxed text-one-dark-foreground">
                        {{ repo.description }}
                    </p>
                </div>
                <div class="mt-5 flex gap-4 font-mono text-xs tabular-nums text-one-dark-foreground">
                    <span><Icon :icon="['fas', 'star']" class="mr-1" />{{ repo.stargazers_count }}</span>
                    <span><Icon :icon="['fas', 'code-branch']" class="mr-1" />{{ repo.forks_count }}</span>
                </div>
            </a>
            </template>
        </div>
    </section>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ActivityCalendarWidget from "activity-calendar-widget/vue";
import { fetchGithub, loadFeed } from "../lib/feeds.js";

// One Dark tones so empty days don't glow white on the dark page
const levelColors = ["#2c313a", "#98c37940", "#98c37980", "#98c379bf", "#98c379"];
const repos = ref([]);
const state = ref("loading");
const convertedData = ref([]);
const mounted = ref(false);

// The calendar only renders from md (768px) up
const daysToRender = ref(300);
const updateDaysToRender = () => {
    daysToRender.value = window.innerWidth < 1024 ? 250 : 300;
};

const load = async () => {
    try {
        const { repos: pinned, contributions } = await loadFeed("github", fetchGithub);
        repos.value = pinned;
        state.value = pinned.length ? "ok" : "error";
        // Convert to the ActivityCalendarWidget format
        convertedData.value = contributions.map(({ date, count }) => ({
            date,
            activities: Array(count).fill({}),
        }));
    } catch (error) {
        console.warn("Error fetching GitHub data:", error);
        state.value = "error";
    }
};

onMounted(() => {
    mounted.value = true;
    updateDaysToRender();
    window.addEventListener("resize", updateDaysToRender);
    load();
});

onUnmounted(() => {
    window.removeEventListener("resize", updateDaysToRender);
});
</script>
