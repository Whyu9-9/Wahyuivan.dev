<template>
    <div class="mx-auto max-w-4xl space-y-20 px-6 py-16 sm:py-24">
        <Header />
        <Experience />
        <Project />
        <Blogs />
        <Github />
        <Content />
        <Tools />
        <Footer />
    </div>
</template>
<script setup>
import Header from "../components/Header.vue";
import Tools from "../components/Tools.vue";
import Github from "../components/Github.vue";
import Footer from "../components/Footer.vue";
import Blogs from "../components/Blogs.vue";
import Project from "../components/Project.vue";
import Experience from "../components/Experience.vue";
import Content from "../components/Content.vue";
</script>
