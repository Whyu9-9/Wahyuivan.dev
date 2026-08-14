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
                        <img
                            v-for="(icon, index) in stackIcons"
                            :key="index"
                            :src="icon.src"
                            :alt="icon.name"
                            loading="lazy"
                            decoding="async"
                            width="48"
                            height="48"
                            class="h-12 w-12 object-contain"
                        />
                    </div>
                </div>
                <div class="mb-2">
                    <div class="font-black text-sm mb-4">/services/</div>
                    <div
                        class="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3"
                    >
                        <img
                            v-for="(icon, index) in serviceIcons"
                            :key="index"
                            :src="icon.src"
                            :alt="icon.name"
                            loading="lazy"
                            decoding="async"
                            width="48"
                            height="48"
                            class="h-12 w-12 object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import android from "devicon/icons/android/android-plain.svg";
import bootstrap from "devicon/icons/bootstrap/bootstrap-original.svg";
import css3 from "devicon/icons/css3/css3-plain-wordmark.svg";
import git from "devicon/icons/git/git-plain.svg";
import go from "devicon/icons/go/go-original.svg";
import html5 from "devicon/icons/html5/html5-plain-wordmark.svg";
import java from "devicon/icons/java/java-plain-wordmark.svg";
import javascript from "devicon/icons/javascript/javascript-plain.svg";
import jquery from "devicon/icons/jquery/jquery-plain-wordmark.svg";
import kotlin from "devicon/icons/kotlin/kotlin-plain.svg";
import mysql from "devicon/icons/mysql/mysql-plain-wordmark.svg";
import nodejs from "devicon/icons/nodejs/nodejs-plain-wordmark.svg";
import postgresql from "devicon/icons/postgresql/postgresql-plain.svg";
import python from "devicon/icons/python/python-plain.svg";
import react from "devicon/icons/react/react-original.svg";
import ruby from "devicon/icons/ruby/ruby-plain-wordmark.svg";
import sqlite from "devicon/icons/sqlite/sqlite-original.svg";
import typescript from "devicon/icons/typescript/typescript-plain.svg";
import vuejs from "devicon/icons/vuejs/vuejs-original.svg";
import laravel from "devicon/icons/laravel/laravel-original.svg";
import php from "devicon/icons/php/php-original.svg";
import githubWordmark from "devicon/icons/github/github-original-wordmark.svg";
import googlecloud from "devicon/icons/googlecloud/googlecloud-plain.svg";
import firebase from "devicon/icons/firebase/firebase-plain.svg";
import bitbucket from "devicon/icons/bitbucket/bitbucket-original.svg";
import cloudflare from "devicon/icons/cloudflare/cloudflare-original.svg";
import aws from "devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg";
import appwrite from "devicon/icons/appwrite/appwrite-original.svg";

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
    { src: githubWordmark, name: "GitHub" },
    { src: googlecloud, name: "Google Cloud" },
    { src: firebase, name: "Firebase" },
    { src: bitbucket, name: "Bitbucket" },
    { src: cloudflare, name: "Cloudflare" },
    { src: aws, name: "Amazon Web Services" },
    { src: appwrite, name: "Appwrite" },
];
</script>
