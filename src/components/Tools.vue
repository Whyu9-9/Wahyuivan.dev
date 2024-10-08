<template>
    <h2 class="mb-3 font-black text-2xl">~/tools/</h2>
    <div
        class="bg-[#202020]/[.3] border-[#504945] border-[0.5px] rounded-lg text-sm pt-5 px-5 pb-3"
    >
        <div class="grid md:grid-cols-2 gap-5 text-one-dark-foreground">
            <div class="mb-2">
                <div class="font-black text-sm mb-4">/stacks/</div>
                <div
                    class="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2"
                >
                    <i
                        v-for="(icon, index) in stackIcons"
                        :key="index"
                        :class="icon.class"
                        style="font-size: 3rem"
                    ></i>
                </div>
            </div>
            <div class="mb-2">
                <div class="font-black text-sm mb-4">/services/</div>
                <div
                    class="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2"
                >
                    <i
                        v-for="(icon, index) in serviceIcons"
                        :key="index"
                        :class="icon.class"
                        style="font-size: 3rem"
                    ></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const stackIcons = [
    { class: "devicon-android-plain colored" },
    { class: "devicon-bootstrap-plain colored" },
    { class: "devicon-css3-plain-wordmark colored" },
    { class: "devicon-git-plain colored" },
    { class: "devicon-go-plain colored" },
    { class: "devicon-html5-plain-wordmark colored" },
    { class: "devicon-java-plain-wordmark colored" },
    { class: "devicon-javascript-plain colored" },
    { class: "devicon-jquery-plain-wordmark colored" },
    { class: "devicon-kotlin-plain colored" },
    { class: "devicon-mysql-plain-wordmark colored" },
    { class: "devicon-nodejs-plain-wordmark colored" },
    { class: "devicon-postgresql-plain colored" },
    { class: "devicon-python-plain colored" },
    { class: "devicon-react-original-wordmark colored" },
    { class: "devicon-ruby-plain-wordmark colored" },
    { class: "devicon-sqlite-plain colored" },
    { class: "devicon-typescript-plain colored" },
    { class: "devicon-vuejs-plain-wordmark colored" },
    { class: "devicon-laravel-plain colored" },
    { class: "devicon-php-plain colored" },
];
const serviceIcons = [
    { class: "devicon-github-original-wordmark" },
    { class: "devicon-googlecloud-plain colored" },
    { class: "devicon-firebase-plain colored" },
    { class: "devicon-bitbucket-plain colored" },
    { class: "devicon-cloudflare-plain colored" },
    { class: "devicon-amazonwebservices-plain colored" },
    { class: "devicon-appwrite-plain colored" },
];
</script>
