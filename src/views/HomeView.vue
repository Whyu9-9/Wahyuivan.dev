<template>
    <div class="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
    </div>
    <div
        class="too-small-min:hidden h-screen flex flex-col justify-center items-center p-7"
    >
        <div class="text-2xl font-sans font-bold text-center">
            Sorry, this website is
            <span class="text-one-dark-red">not optimized</span> for your device
            :(
        </div>
    </div>
    <div
        class="too-small-max:hidden sm:pt-20 max-w-screen-lg mx-auto p-16 relative"
    >
        <div
            class="z-0 absolute -mt-5 ml-5 left-0 text-[5rem] opacity-15 select-none"
        >
            🚀
        </div>
        <div class="relative mb-10"><Header /></div>
        <div class="mb-10"><Tools /></div>
        <div
            class="z-0 right-0 top-[47rem] md:bottom-[80rem] absolute mb-10 ml-7 text-[7rem] opacity-10 select-none lg:block hidden"
        >
            👨‍💻
        </div>
        <div class="mb-10"><Project /></div>
        <div
            class="z-0 right-0 top-[114rem] md:bottom-[80rem] absolute mb-10 mr-7 text-[7rem] opacity-15 select-none lg:block hidden"
        >
            💼
        </div>
        <div class="mb-10"><Experience /></div>
        <div
            class="z-0 left-0 top-[65rem] md:bottom-[80rem] absolute mb-10 ml-7 text-[9rem] opacity-5 select-none lg:block hidden"
        >
            ⚙️
        </div>
        <div class="relative mb-10"><Blogs /></div>
        <div
            class="z-0 bottom-[46rem] left-0 absolute mb-5 ml-3 text-[9rem] opacity-10 select-none lg:block hidden"
        >
            📕
        </div>
        <div class="relative mb-16"><Github /></div>
        <div
            class="z-0 bottom-14 right-0 absolute mb-3 mr-5 text-[7rem] opacity-15 select-none"
        >
            💻
        </div>
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
</script>
