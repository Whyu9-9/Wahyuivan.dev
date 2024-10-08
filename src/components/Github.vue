<template>
    <div>
        <h2 class="mb-3 font-black text-2xl">~/repositories/</h2>
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
                    <div class="flex items-center gap-2 text-one-dark-gray">
                        <img
                            :src="repo.owner.avatar_url"
                            class="rounded-full w-4"
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
                    <div class="text-xs text-one-dark-gray">
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
import { ref, onMounted } from "vue";

const projects = [
    "MyGram-API",
    "Open-Music-API",
    "ElysiaBlogAPI",
    "ChromeBuiltInAISimpleDemo",
];
const repos = ref([]);

onMounted(async () => {
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
</script>
