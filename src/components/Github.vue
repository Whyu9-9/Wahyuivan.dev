<template>
    <div>
        <h2 class="mb-3 font-black text-2xl">~/repositories/</h2>
        <div
            class="relative md:flex justify-center items-center bg-[#202020]/[.3] border-[#504945] border-[0.5px] rounded-lg mb-4 overflow-scroll hidden p-5 w-full"
        >
            <i
                class="devicon-github-plain absolute top-2 left-2 text-2xl m-3"
            ></i>
            <ActivityCalendarWidget
                :data="convertedData"
                :daysToRender="daysToRender"
            />
        </div>
        <div class="grid md:grid-cols-2 gap-4">
            <div v-if="!repos.length">Github repos could not be retrieved.</div>
            <a
                v-bind:key="repo.html_url"
                v-for="repo in repos"
                :href="repo.html_url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col justify-between px-5 py-3 bg-[#202020]/[.3] border-[#504945] border-[0.5px] rounded-lg text-sm"
            >
                <div>
                    <div
                        v-lazy-container="{ selector: 'img' }"
                        class="flex items-center gap-2 text-one-dark-foreground"
                    >
                        <img
                            :data-src="repo.owner.avatar_url"
                            class="rounded-full w-4 h-4"
                            alt="github-profile"
                            fetchpriority="low"
                            loading="lazy"
                            as="image"
                        />
                        {{ repo.owner.login }}
                    </div>
                    <div
                        :class="[
                            'font-bold',
                            'md:text-lg',
                            'text-md',
                            'mb-2',
                            'mt-2',
                            repo.archived ? 'line-through' : '',
                        ]"
                    >
                        <i class="devicon-github-plain"></i>&nbsp;{{
                            repo.name
                        }}
                    </div>
                    <div class="text-xs text-one-dark-foreground">
                        {{ repo.description }}
                    </div>
                </div>
                <div class="flex mt-5 gap-5">
                    <div>
                        <font-awesome-icon
                            :icon="['fas', 'star']"
                            style="color: gold"
                        />
                        {{ repo.stargazers_count }}
                    </div>
                    <div>
                        <font-awesome-icon
                            :icon="['fas', 'code-branch']"
                            class="text-one-dark-orange"
                        />
                        {{ repo.forks_count }}
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import ActivityCalendarWidget from "activity-calendar-widget/vue";

const projects = [
    "MyGram-API",
    "Open-Music-API",
    "ElysiaBlogAPI",
    "ChromeBuiltInAISimpleDemo",
];
const repos = ref([]);
const contributions = ref([]);
const convertedData = ref([]);

const daysToRender = ref(300); // Default value

const updateDaysToRender = () => {
    const width = window.innerWidth;

    if (width < 640) {
        // Small screens
        daysToRender.value = 70; // Show fewer days
    } else if (width < 768) {
        // Medium screens
        daysToRender.value = 200; // Show moderate days
    } else if (width < 1024) {
        // Large screens
        daysToRender.value = 250; // Show more days
    } else {
        daysToRender.value = 300; // Default value for larger screens
    }
};

onMounted(async () => {
    // Initial call
    updateDaysToRender();

    // Update daysToRender on resize
    window.addEventListener("resize", updateDaysToRender);

    await fetch(
        "https://github-contributions-api.jogruber.de/v4/Whyu9-9?y=last"
    )
        .then((response) => response.json())
        .then((data) => {
            contributions.value = data.contributions;

            // Convert the fetched data to match ActivityCalendarWidget format
            convertedData.value = contributions.value.map((contribution) => {
                return {
                    date: contribution.date,
                    activities: Array(contribution.count).fill({}),
                };
            });
        });
    await fetch("https://api.github.com/users/Whyu9-9/repos?per_page=999")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((repo) => {
                if (projects.includes(repo.name)) {
                    repos.value.push(repo);
                }
            });
        })
        .catch(() => {
            return;
        });
});

watch(() => window.innerWidth, updateDaysToRender); // Watch for window width changes

// Clean up the event listener on component unmount
onUnmounted(() => {
    window.removeEventListener("resize", updateDaysToRender);
});
</script>
