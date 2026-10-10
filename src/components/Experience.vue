<template>
    <section>
        <div class="mb-8">
            <p class="section-label"><span class="text-one-dark-blue">~/</span>experience</p>
            <h2 class="section-title">Where I've worked</h2>
        </div>
        <ol class="divide-y divide-one-dark-line border-y border-one-dark-line">
            <li v-for="experience in [...experiences].reverse()" :key="experience.company"
                class="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <span class="pt-0.5 font-mono text-xs tabular-nums text-one-dark-foreground">
                    {{ experience.period }}
                </span>
                <div>
                    <h3 class="font-medium">
                        <span v-if="experience.period.includes('Present')"
                            class="mr-2 rounded bg-one-dark-green/15 px-1.5 py-0.5 align-middle font-mono text-[11px] text-one-dark-green">Now</span>
                        {{ experience.title }}
                        <span class="text-one-dark-foreground"> · </span>
                        <a :href="experience.companyWebsite" target="_blank" rel="noopener noreferrer" class="link">{{
                            experience.company }}</a>
                    </h3>
                    <p class="mt-1 max-w-prose text-sm leading-relaxed text-one-dark-foreground">
                        {{ experience.description }}
                    </p>
                </div>
            </li>
        </ol>
    </section>
</template>
<script setup>
const experiences = [
    {
        title: "Backend Web Developer Intern",
        company: "Timedoor Indonesia",
        period: "Aug 2021 - Jan 2022",
        description:
            "Working on the backend of a web application for managing project tasks and collaboration.",
        companyWebsite: "https://timedoor.net/",
    },
    {
        title: "Quality Assurance Engineer",
        company: "Djoin",
        period: "Apr 2022 - Aug 2023",
        description:
            "Working on the QA team to ensure the quality of the software products.",
        companyWebsite: "https://djoin.id/",
    },
    {
        title: "Software Engineer - FE",
        company: "Taksu Tech",
        period: "Aug 2023 - Oct 2024",
        description:
            "Working on various software projects, including web development and mobile app development",
        companyWebsite: "https://taksu.tech/",
    },
    {
        title: "Frontend Developer",
        company: "Incentro",
        period: "Nov 2024 - Present",
        description:
            "Contribute to developing web applications for various scale projects, focusing on user experience and performance.",
        companyWebsite: "https://www.incentro.com/en",
    },
];
</script>
