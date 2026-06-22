<template>
    <div class="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
    </div>
    <div class="too-small-min:hidden h-screen flex flex-col justify-center items-center p-7">
        <div class="text-2xl font-sans font-bold text-center">
            Sorry, this website is
            <span class="text-one-dark-red">not optimized</span> for your device
            :(
        </div>
    </div>
    <div class="too-small-max:hidden sm:pt-20 max-w-screen-lg mx-auto p-16 relative">
        <div class="z-0 absolute -mt-5 ml-5 left-0 text-[5rem] opacity-15 select-none">
            🚀
        </div>
        <div ref="headerRef" class="relative mb-12">
            <Header />
        </div>
        <div ref="toolsRef" class="mb-12">
            <Tools />
        </div>
        <div
            class="z-0 right-0 top-[47rem] md:bottom-[80rem] absolute mb-12 ml-7 text-[7rem] opacity-10 select-none lg:block hidden">
            👨‍💻
        </div>
        <div ref="projectRef" class="mb-12">
            <Project />
        </div>
        <div
            class="z-0 right-0 top-[114rem] md:bottom-[80rem] absolute mb-12 mr-7 text-[7rem] opacity-15 select-none lg:block hidden">
            💼
        </div>
        <div ref="experienceRef" class="mb-12">
            <Experience />
        </div>
        <div
            class="z-0 left-0 top-[65rem] md:bottom-[80rem] absolute mb-12 ml-7 text-[9rem] opacity-5 select-none lg:block hidden">
            ⚙️
        </div>
        <div ref="blogsRef" class="relative mb-12">
            <Blogs />
        </div>
        <div class="z-0 bottom-[46rem] left-0 absolute mb-5 ml-3 text-[9rem] opacity-10 select-none lg:block hidden">
            📕
        </div>
        <div ref="githubRef" class="relative mb-12">
            <Github />
        </div>
        <div ref="socialRef" class="relative mb-12">
            <SocialMedia />
        </div>
        <div class="z-0 bottom-14 right-0 absolute mb-3 mr-5 text-[7rem] opacity-15 select-none">
            💻
        </div>
        <Footer />
    </div>
</template>
<script setup>
import { ref } from "vue";
import Header from "../components/Header.vue";
import Tools from "../components/Tools.vue";
import Github from "../components/Github.vue";
import Footer from "../components/Footer.vue";
import Blogs from "../components/Blogs.vue";
import Project from "../components/Project.vue";
import Experience from "../components/Experience.vue";
import SocialMedia from "../components/SocialMedia.vue";
import { useScrollReveal } from "../composables/useScrollReveal.js";

const headerRef = ref(null);
const toolsRef = ref(null);
const projectRef = ref(null);
const experienceRef = ref(null);
const blogsRef = ref(null);
const githubRef = ref(null);
const socialRef = ref(null);

useScrollReveal([headerRef, toolsRef, projectRef, experienceRef, blogsRef, githubRef, socialRef]);
</script>
