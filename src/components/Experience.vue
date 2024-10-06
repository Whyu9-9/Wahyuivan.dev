<template>
    <h2 class="mb-3 font-black text-2xl">~/experiences/</h2>
    <div
        class="mx-auto py-10 relative bg-[#202020]/[.3] border-[#504945] border-[0.5px] rounded-lg text-sm pt-9 px-5 pb-0 overflow-hidden"
    >
        <!-- Vertical snake line -->
        <div
            class="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-one-dark-blue top-0 hidden md:block"
        ></div>

        <div
            v-for="(experience, index) in experiences.slice().reverse()"
            :key="index"
        >
            <!-- Odd Index - Timeline Item Right -->
            <div
                v-if="index % 2 === 0"
                class="mb-8 flex items-center justify-start md:mb-14"
            >
                <div
                    class="w-full md:w-1/2 text-left pl-6 md:pr-6 md:text-right"
                >
                    <h3 class="font-bold text-2xl font-sans">
                        {{ experience.title }}
                    </h3>
                    <p class="text-sm text-one-dark-white font-sans">
                        {{ experience.company }}, {{ experience.period }}
                    </p>
                    <p class="mt-2 text-one-dark-foreground text-xs">
                        {{ experience.description }}
                    </p>
                </div>
                <div
                    :class="
                        index !== 0 ? 'bg-one-dark-red' : 'bg-one-dark-green'
                    "
                    class="w-8 h-8 rounded-full border-4 border-one-dark-bg z-0 hidden md:block md:-ml-4"
                ></div>
            </div>

            <!-- Even Index - Timeline Item Left -->
            <div v-else class="mb-8 flex items-center justify-end md:mb-14">
                <div
                    :class="
                        index !== 0 ? 'bg-one-dark-red' : 'bg-one-dark-green'
                    "
                    class="w-8 h-8 rounded-full border-4 border-one-dark-bg z-0 hidden md:block md:-mr-4"
                ></div>
                <div class="w-full md:w-1/2 text-left pl-6">
                    <h3 class="font-bold text-2xl font-sans">
                        {{ experience.title }}
                    </h3>
                    <p class="text-sm text-one-dark-white font-sans">
                        {{ experience.company }}, {{ experience.period }}
                    </p>
                    <p class="mt-2 text-one-dark-foreground text-xs">
                        {{ experience.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const experiences = ref([
    {
        title: "Backend Web Developer Intern",
        company: "Timedoor Indonesia",
        period: "Aug 2021 - Jan 2022",
        description:
            "Working on the backend of a web application for managing project tasks and collaboration.",
    },
    {
        title: "Quality Assurance Engineer",
        company: "Djoin",
        period: "Apr 2022 - Aug 2023",
        description:
            "Working on the QA team to ensure the quality of the software products.",
    },
    {
        title: "Software Engineer - Fullstack",
        company: "Taksu Tech",
        period: "Aug 2023 - Oct 2024",
        description:
            "Working on various software projects, including web development, mobile app development, and backend development.",
    },
    {
        title: "Software Engineer - FE",
        company: "Incentro",
        period: "Oct 2024 - Present",
        description:
            "Developing web applications for large-scale projects, focusing on user experience and performance.",
    },
]);
</script>
