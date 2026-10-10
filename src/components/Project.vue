<template>
    <section>
        <div class="mb-8">
            <p class="section-label"><span class="text-one-dark-blue">~/</span>projects</p>
            <h2 class="section-title">Selected work</h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a v-for="(project, index) in projects" :key="project.title" :href="project.src" target="_blank"
                rel="noopener noreferrer" :class="[
                    'card-link group flex flex-col overflow-hidden',
                    index === 0 && 'lg:col-span-2 lg:row-span-2',
                ]">
                <div class="flex-1 overflow-hidden border-b border-one-dark-line">
                    <img :src="project.src" :alt="`${project.title} screenshot`"
                        loading="lazy" decoding="async" width="1280" height="800"
                        class="aspect-[16/10] h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div class="p-5">
                    <h3 class="font-medium">{{ project.title }}</h3>
                    <p class="mt-1 text-sm leading-relaxed text-one-dark-foreground">
                        {{ project.desc }}
                    </p>
                </div>
            </a>
        </div>
    </section>
</template>

<script setup>
const projects = [
    {
        src: "https://storage.wahyuivan.dev/Picture1.webp",
        title: "Alengkong Bali Camp",
        desc: "An interactive website to ease up user booking process for Alengkong Bali Camp.",
    },
    {
        src: "https://storage.wahyuivan.dev/Picture3.webp",
        title: "MyTISI Gobolabali",
        desc: "An admin dashboard for MyTISI Gobolabali to manage players, teams, and matches.",
    },
    {
        src: "https://storage.wahyuivan.dev/Picture2.webp",
        title: "Claudia Fitness",
        desc: "An admin dashboard for Claudia Fitness to manage clients, orders, and payments.",
    },
    {
        src: "https://storage.wahyuivan.dev/Screenshot%202024-10-06%20at%2010.11.37.webp",
        title: "Chrome Built-in AI",
        desc: "An experimental Chrome feature to use AI directly in the browser.",
    },
    {
        src: "https://storage.wahyuivan.dev/Picture4.webp",
        title: "PT. Pancoran Mas",
        desc: "An admin dashboard for PT. Pancoran Mas to manage LPG sales and inventory.",
    },
    {
        src: "https://storage.wahyuivan.dev/Picture5.webp",
        title: "ASDP Indonesia Ferry",
        desc: "An admin dashboard for ASDP Indonesia Ferry to manage blog posts and comments.",
    },
];
</script>
