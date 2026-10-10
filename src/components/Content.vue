<template>
    <section>
        <div class="mb-8">
            <p class="section-label"><span class="text-one-dark-blue">~/</span>content</p>
            <h2 class="section-title">I also make videos</h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-3">
            <a v-for="channel in channels" :key="channel.name" :href="channel.url" target="_blank"
                rel="noopener noreferrer" class="card-link group flex items-center gap-4 p-5">
                <span :class="['grid h-11 w-11 shrink-0 place-items-center rounded-lg text-xl', channel.tint]">
                    <Icon :icon="['fab', channel.icon]" />
                </span>
                <span class="min-w-0">
                    <span class="block font-medium">{{ channel.name }}</span>
                    <span class="block truncate font-mono text-xs text-one-dark-foreground">{{ channel.handle }}</span>
                </span>
                <span
                    class="ml-auto text-one-dark-gray transition group-hover:translate-x-0.5 group-hover:text-one-dark-white">↗</span>
            </a>
        </div>
    </section>
</template>

<script setup>
const channels = [
    {
        name: "YouTube",
        handle: "@wahyuivan9",
        icon: "youtube",
        tint: "bg-one-dark-red/15 text-one-dark-red",
        url: "https://www.youtube.com/@wahyuivan9",
    },
    {
        name: "TikTok",
        handle: "@wahyuivanmahendra",
        icon: "tiktok",
        tint: "bg-one-dark-cyan/15 text-one-dark-cyan",
        url: "https://www.tiktok.com/@wahyuivanmahendra",
    },
    {
        name: "Instagram",
        handle: "@why.u9",
        icon: "instagram",
        tint: "bg-one-dark-purple/15 text-one-dark-purple",
        url: "https://www.instagram.com/why.u9",
    },
];
</script>
