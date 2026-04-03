<template>
    <div>
        <h2 class="mb-3 font-black text-2xl">~/tools/</h2>
        <div
            class="bg-[#202020]/[.3] border-[#504945] border-[0.5px] rounded-lg text-sm pt-5 px-5 pb-3"
        >
            <div
                class="grid md:grid-cols-2 gap-3 md:gap-10 text-one-dark-foreground"
            >
                <div class="mb-2">
                    <div class="font-black text-sm mb-4">/stacks/</div>
                    <div
                        class="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3"
                    >
                        <div
                            v-for="(icon, index) in stackIcons"
                            :key="index"
                            class="relative group flex items-center justify-center"
                        >
                            <i
                                :class="icon.class"
                                style="font-size: 3rem"
                            ></i>
                            <span
                                class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium text-one-dark-bg bg-one-dark-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg z-10"
                            >
                                {{ icon.name }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="mb-2">
                    <div class="font-black text-sm mb-4">/services/</div>
                    <div
                        class="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3"
                    >
                        <div
                            v-for="(icon, index) in serviceIcons"
                            :key="index"
                            class="relative group flex items-center justify-center"
                        >
                            <i
                                :class="icon.class"
                                style="font-size: 3rem"
                            ></i>
                            <span
                                class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium text-one-dark-bg bg-one-dark-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg z-10"
                            >
                                {{ icon.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const stackIcons = [
    { class: "devicon-android-plain colored", name: "Android" },
    { class: "devicon-bootstrap-plain colored", name: "Bootstrap" },
    { class: "devicon-css3-plain-wordmark colored", name: "CSS3" },
    { class: "devicon-git-plain colored", name: "Git" },
    { class: "devicon-go-plain colored", name: "Go" },
    { class: "devicon-html5-plain-wordmark colored", name: "HTML5" },
    { class: "devicon-java-plain-wordmark colored", name: "Java" },
    { class: "devicon-javascript-plain colored", name: "JavaScript" },
    { class: "devicon-jquery-plain-wordmark colored", name: "jQuery" },
    { class: "devicon-kotlin-plain colored", name: "Kotlin" },
    { class: "devicon-mysql-plain-wordmark colored", name: "MySQL" },
    { class: "devicon-nodejs-plain-wordmark colored", name: "Node.js" },
    { class: "devicon-postgresql-plain colored", name: "PostgreSQL" },
    { class: "devicon-python-plain colored", name: "Python" },
    { class: "devicon-react-original colored", name: "React" },
    { class: "devicon-ruby-plain-wordmark colored", name: "Ruby" },
    { class: "devicon-sqlite-plain colored", name: "SQLite" },
    { class: "devicon-typescript-plain colored", name: "TypeScript" },
    { class: "devicon-vuejs-plain colored", name: "Vue.js" },
    { class: "devicon-laravel-plain colored", name: "Laravel" },
    { class: "devicon-php-plain colored", name: "PHP" },
];
const serviceIcons = [
    { class: "devicon-github-original-wordmark", name: "GitHub" },
    { class: "devicon-googlecloud-plain colored", name: "Google Cloud" },
    { class: "devicon-firebase-plain colored", name: "Firebase" },
    { class: "devicon-bitbucket-plain colored", name: "Bitbucket" },
    { class: "devicon-cloudflare-plain colored", name: "Cloudflare" },
    { class: "devicon-amazonwebservices-plain colored", name: "AWS" },
    { class: "devicon-appwrite-plain colored", name: "Appwrite" },
];
</script>
