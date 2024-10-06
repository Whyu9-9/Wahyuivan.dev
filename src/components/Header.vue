<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-3 mt-5 justify-center">
        <div class="flex flex-col">
            <h1 class="font-sans font-black text-5xl mb-3 mt-5">
                Hi, I'm <span :class="['text-5xl', status]">Wahyu</span>.
            </h1>
            <div class="mt-3 mb-3 text-md md:text-justify">
                I'm a passionate {{ new Date().getFullYear() - 1999 }}-years-old
                full-time software engineer by day,
                <a
                    href="https://www.youtube.com/@wahyuivan9"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="underline"
                    >tech content creator</a
                >
                by night, and a full-time tech enthusiast living in Bali,
                Indonesia 🇮🇩 🌴
            </div>
            <div
                class="flex items-center gap-2 text-sm text-one-dark-gray mt-3 md:text-justify"
            >
                <font-awesome-icon
                    :icon="['fas', 'laptop-code']"
                    class="w-5 h-5 mr-1"
                />
                <div>
                    I'm currently working at
                    <a
                        :href="`https://taksu.tech`"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-black underline"
                        >PT. Taksu Teknologi Indonesia</a
                    >
                </div>
            </div>
            <div
                class="flex items-center gap-2 text-sm text-one-dark-gray mt-3 md:text-justify"
            >
                <font-awesome-icon
                    :icon="['fas', 'code']"
                    class="w-5 h-5 mr-1"
                />
                <div v-if="vscode">
                    Currently diving into code since:
                    <span class="font-black">{{
                        new Date(vscode.timestamps.start).toLocaleString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                            }
                        )
                    }}</span>
                    <span class="font-black"> ({{ timeDiff }})</span>
                </div>
                <div v-else>I'm not working on anything right now.</div>
            </div>
            <div class="flex gap-3 mt-7 text-lg md:gap-5 md:mx-0">
                <a
                    v-for="(link, key) in socials"
                    :key="key"
                    :href="link"
                    :alt="key"
                    target="_blank"
                    rel="noopener noreferrer"
                    ><font-awesome-icon :icon="['fab', key]"
                /></a>
            </div>
        </div>
        <div class="relative group">
            <!-- Profile Image -->
            <img
                src="/src/assets/profile.png"
                class="md:w-72 lg:h-80 rounded my-10 mx-auto w-full h-96 object-cover"
                alt="Profile Picture"
            />

            <!-- Overlay (hidden by default, appears on hover) -->
            <div
                class="text-sm absolute inset-0 bg-one-dark-bg bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <!-- See CV Button -->
                <a
                    href="https://docs.google.com/document/d/1P-8tGI_fHPG6Afj4WaU89pA1ZpRtZz-uzf164pvGYIk/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-one-dark-gray text-one-dark-white py-2 px-4 rounded-lg font-bold hover:bg-one-dark-blue hover:text-one-dark-white transition-colors md:mt-52 mt-72"
                >
                    <font-awesome-icon :icon="['fas', 'download']" />
                    Download CV
                </a>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const ws = ref(null);
const status = ref("text-one-dark-gray");
const vscode = ref(null);
const socials = ref({
    github: "https://github.com/Whyu9-9",
    linkedin: "https://www.linkedin.com/in/wahyuivan",
    tiktok: "https://www.tiktok.com/@wahyuivanmahendra",
    instagram: "https://www.instagram.com/why.u9",
    youtube: "https://www.youtube.com/@wahyuivan9",
    medium: "https://medium.com/@wahyuivan",
    "x-twitter": "https://twitter.com/ivanwahyu195",
});

const connectWebSocket = () => {
    ws.value = new WebSocket("wss://api.lanyard.rest/socket");
    ws.value.onopen = () => {
        ws.value.send(
            JSON.stringify({
                op: 2,
                d: { subscribe_to_id: import.meta.env.VITE_DISCORD_ID },
            })
        );
    };

    ws.value.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") {
            const presence = data.d;

            vscode.value = presence.activities.find(
                (activity) => activity.name === "VSCode"
            );

            switch (presence.discord_status) {
                case "online":
                    status.value = "text-one-dark-green";
                    break;
                case "idle":
                    status.value = "text-one-dark-yellow";
                    break;
                case "dnd":
                    status.value = "text-one-dark-red";
                    break;
                case "offline":
                    status.value = "text-one-dark-gray";
                    break;
            }

            ws.value.onerror = (error) => {
                throw new Error(error);
            };

            ws.value.onclose = () => {
                throw new Error("WebSocket connection closed.");
            };
        }
    };
};

onMounted(async () => {
    connectWebSocket();
});

onUnmounted(() => {
    if (ws.value) {
        ws.value.close();
    }
});

// Computed property to calculate the time difference
const timeDiff = computed(() => {
    if (
        !vscode.value ||
        !vscode.value.timestamps ||
        !vscode.value.timestamps.start
    ) {
        return "not working on anything right now";
    }

    const startDate = new Date(vscode.value.timestamps.start);
    const now = new Date();
    const diffInMilliseconds = now - startDate;

    const seconds = Math.floor((diffInMilliseconds / 1000) % 60);
    const minutes = Math.floor((diffInMilliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((diffInMilliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    let diffString = "";

    if (days > 0) {
        diffString += `${days} day${days > 1 ? "s" : ""} `;
    }

    if (hours > 0) {
        diffString += `${hours} hour${hours > 1 ? "s" : ""} `;
    }

    if (minutes > 0) {
        diffString += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }

    if (seconds > 0 && !diffString) {
        diffString += `${seconds} second${seconds > 1 ? "s" : ""}`;
    }

    return diffString || "just started";
});
</script>
