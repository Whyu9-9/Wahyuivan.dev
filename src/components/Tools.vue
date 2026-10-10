<template>
    <section>
        <div class="mb-8">
            <p class="section-label"><span class="text-one-dark-blue">~/</span>tools</p>
            <h2 class="section-title">Tools I reach for</h2>
        </div>
        <div class="space-y-6">
            <div v-for="group in groups" :key="group.label">
                <h3 class="mb-3 text-sm text-one-dark-foreground">{{ group.label }}</h3>
                <ul class="flex flex-wrap gap-2">
                    <li v-for="icon in group.icons" :key="icon.name"
                        class="group flex items-center gap-2 rounded-lg border border-one-dark-line bg-one-dark-bg/40 px-3 py-1.5 text-sm text-one-dark-foreground transition-colors hover:border-one-dark-gray hover:text-one-dark-white">
                        <img :src="icon.src" alt="" loading="lazy" decoding="async" width="16" height="16"
                            class="h-4 w-4 object-contain" />
                        {{ icon.name }}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
<script setup>
import android from "devicon/icons/android/android-plain.svg";
import bootstrap from "devicon/icons/bootstrap/bootstrap-original.svg";
import css3 from "devicon/icons/css3/css3-plain.svg";
import git from "devicon/icons/git/git-plain.svg";
import go from "devicon/icons/go/go-original.svg";
import html5 from "devicon/icons/html5/html5-plain.svg";
import java from "devicon/icons/java/java-plain.svg";
import javascript from "devicon/icons/javascript/javascript-plain.svg";
import jquery from "devicon/icons/jquery/jquery-plain.svg";
import kotlin from "devicon/icons/kotlin/kotlin-plain.svg";
import mysql from "../assets/icons/mysql.svg";
import nodejs from "devicon/icons/nodejs/nodejs-plain.svg";
import postgresql from "devicon/icons/postgresql/postgresql-plain.svg";
import python from "devicon/icons/python/python-plain.svg";
import react from "devicon/icons/react/react-original.svg";
import ruby from "devicon/icons/ruby/ruby-plain.svg";
import sqlite from "devicon/icons/sqlite/sqlite-original.svg";
import typescript from "devicon/icons/typescript/typescript-plain.svg";
import vuejs from "devicon/icons/vuejs/vuejs-original.svg";
import laravel from "devicon/icons/laravel/laravel-original.svg";
import php from "devicon/icons/php/php-original.svg";
import github from "../assets/icons/github.svg";
import googlecloud from "devicon/icons/googlecloud/googlecloud-plain.svg";
import firebase from "devicon/icons/firebase/firebase-plain.svg";
import bitbucket from "devicon/icons/bitbucket/bitbucket-original.svg";
import cloudflare from "devicon/icons/cloudflare/cloudflare-original.svg";
import aws from "devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg";
import appwrite from "devicon/icons/appwrite/appwrite-original.svg";
import claude from "../assets/ai/claude.svg";
import chatgpt from "../assets/ai/chatgpt.svg";
import gemini from "../assets/ai/gemini.svg";
import deepseek from "../assets/ai/deepseek.svg";
import glm from "../assets/ai/glm.svg";

const stackIcons = [
    { src: android, name: "Android" },
    { src: bootstrap, name: "Bootstrap" },
    { src: css3, name: "CSS3" },
    { src: git, name: "Git" },
    { src: go, name: "Go" },
    { src: html5, name: "HTML5" },
    { src: java, name: "Java" },
    { src: javascript, name: "JavaScript" },
    { src: jquery, name: "jQuery" },
    { src: kotlin, name: "Kotlin" },
    { src: mysql, name: "MySQL" },
    { src: nodejs, name: "Node.js" },
    { src: postgresql, name: "PostgreSQL" },
    { src: python, name: "Python" },
    { src: react, name: "React" },
    { src: ruby, name: "Ruby" },
    { src: sqlite, name: "SQLite" },
    { src: typescript, name: "TypeScript" },
    { src: vuejs, name: "Vue.js" },
    { src: laravel, name: "Laravel" },
    { src: php, name: "PHP" },
];
const serviceIcons = [
    { src: github, name: "GitHub" },
    { src: googlecloud, name: "Google Cloud" },
    { src: firebase, name: "Firebase" },
    { src: bitbucket, name: "Bitbucket" },
    { src: cloudflare, name: "Cloudflare" },
    { src: aws, name: "Amazon Web Services" },
    { src: appwrite, name: "Appwrite" },
];
const aiIcons = [
    { src: claude, name: "Claude" },
    { src: chatgpt, name: "ChatGPT" },
    { src: gemini, name: "Gemini" },
    { src: deepseek, name: "DeepSeek" },
    { src: glm, name: "Z.ai" },
];
const groups = [
    { label: "Languages & frameworks", icons: stackIcons },
    { label: "Platforms & services", icons: serviceIcons },
    { label: "AI", icons: aiIcons },
];
</script>
