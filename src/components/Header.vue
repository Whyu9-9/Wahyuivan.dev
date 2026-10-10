<template>
    <header class="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
            <div
                class="inline-flex items-center gap-2 rounded-full border border-one-dark-line bg-one-dark-bg/60 px-3 py-1 font-mono text-xs text-one-dark-foreground">
                <span class="relative flex h-2 w-2">
                    <span v-if="presence === 'online'"
                        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-one-dark-green opacity-60"></span>
                    <span :class="['relative inline-flex h-2 w-2 rounded-full', statusDot]"></span>
                </span>
                {{ statusLabel }}
            </div>

            <h1 class="mt-6 text-5xl font-semibold tracking-tight md:text-6xl">
                Wahyu Ivan
            </h1>
            <p class="mt-3 text-lg text-one-dark-white/80 md:text-xl">
                Frontend developer at
                <a href="https://www.incentro.com/en" target="_blank" rel="noopener noreferrer"
                    class="link">Incentro</a>, based in Bali 🌴 🇮🇩
            </p>
            <p class="mt-6 max-w-prose text-pretty leading-relaxed text-one-dark-foreground">
                I'm a {{ age }}-year-old software engineer by day,
                <a href="https://www.instagram.com/why.u9" target="_blank" rel="noopener noreferrer" class="link">tech
                    content creator</a>
                by night, and a full-time tech enthusiast the rest of the time.
            </p>

            <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href="mailto:partnership@wahyuivan.dev" class="btn-primary">Contact me</a>
                <a href="https://docs.google.com/document/d/1P-8tGI_fHPG6Afj4WaU89pA1ZpRtZz-uzf164pvGYIk/edit?usp=sharing"
                    target="_blank" rel="noopener noreferrer" class="link text-sm">View CV ↗</a>
            </div>

            <ul class="mt-8 flex gap-5 text-lg text-one-dark-foreground">
                <li v-for="(link, key) in socials" :key="key">
                    <a :href="link" :aria-label="key" :title="key" target="_blank" rel="noopener noreferrer"
                        class="transition-colors hover:text-one-dark-white">
                        <Icon :icon="['fab', key === 'X' ? 'x-twitter' : key.toLowerCase()]" />
                    </a>
                </li>
            </ul>
        </div>

        <img src="https://storage.wahyuivan.dev/profile.webp"
            class="hidden aspect-[4/5] w-60 rounded-2xl object-cover ring-1 ring-one-dark-line md:block lg:w-64"
            alt="Portrait of Wahyu Ivan" fetchpriority="high" loading="eager" decoding="async" width="256"
            height="320" />

        <!-- Live panel: what I'm doing right now, fed by Lanyard -->
        <div class="grid gap-3 sm:grid-cols-2 md:col-span-2">
            <div class="card min-w-0 p-4">
                <p class="font-mono text-xs text-one-dark-foreground">
                    <Icon :icon="['fas', 'code']" class="mr-1.5 text-one-dark-blue" />Now
                </p>
                <template v-if="activity">
                    <p class="mt-3 truncate font-medium">{{ activity.details || `In ${activityApp}` }}</p>
                    <p class="mt-0.5 truncate text-sm text-one-dark-foreground">
                        {{ activityApp }} · {{ timeDiff }}
                    </p>
                </template>
                <template v-else>
                    <p class="mt-3 font-medium">Not coding right now</p>
                    <p class="mt-0.5 text-sm text-one-dark-foreground">Editor is closed</p>
                </template>
            </div>

            <div class="card min-w-0 p-4">
                <p class="font-mono text-xs text-one-dark-foreground">
                    <Icon :icon="['fas', 'location-dot']" class="mr-1.5 text-one-dark-red" />Local time
                </p>
                <p class="mt-3 font-mono text-2xl font-medium tabular-nums">{{ baliTime }}</p>
                <p class="mt-0.5 text-sm text-one-dark-foreground">WITA · Bali, Indonesia</p>
            </div>
        </div>
    </header>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const ws = ref(null);
const presence = ref("offline");
const vscode = ref(null);
const cursor = ref(null);
const now = ref(Date.now());
let clock = null;
const reconnectAttempts = ref(0);
const maxReconnectAttempts = 5;
const reconnectDelay = 3000;

const socials = {
    Github: "https://github.com/Whyu9-9",
    Linkedin: "https://www.linkedin.com/in/wahyuivan",
    Tiktok: "https://www.tiktok.com/@wahyuivanmahendra",
    Instagram: "https://www.instagram.com/why.u9",
    Youtube: "https://www.youtube.com/@wahyuivan9",
    Medium: "https://medium.com/@wahyuivan",
    X: "https://twitter.com/ivanwahyu195",
};

const connectWebSocket = () => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
        return; // Already connected
    }

    try {
        ws.value = new WebSocket("wss://api.lanyard.rest/socket");

        ws.value.onopen = () => {
            reconnectAttempts.value = 0;
            try {
                ws.value.send(
                    JSON.stringify({
                        op: 2,
                        d: { subscribe_to_id: import.meta.env.VITE_DISCORD_ID },
                    })
                );
            } catch (sendError) {
                console.warn(
                    "Error sending message via WebSocket:",
                    sendError
                );
            }
        };

        ws.value.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") {
                    const presenceData = data.d;

                    vscode.value = presenceData.activities.find((activity) =>
                        activity.name.toLowerCase().includes("code")
                    );

                    cursor.value = presenceData.activities.find((activity) =>
                        activity.name.toLowerCase().includes("cursor")
                    );

                    presence.value = presenceData.discord_status;
                }
            } catch (messageError) {
                console.warn(
                    "Error handling WebSocket message:",
                    messageError
                );
            }
        };

        ws.value.onerror = (error) => {
            console.warn("WebSocket Error:", error);
        };

        ws.value.onclose = (event) => {
            // Attempt to reconnect if not a normal closure
            if (event.code !== 1000 && reconnectAttempts.value < maxReconnectAttempts) {
                reconnectAttempts.value++;
                setTimeout(() => {
                    connectWebSocket();
                }, reconnectDelay * reconnectAttempts.value);
            }
        };
    } catch (connectionError) {
        console.warn(
            "Error establishing WebSocket connection:",
            connectionError
        );
    }
};

onMounted(async () => {
    connectWebSocket();
    // Ticks the local clock and the "coding for" duration
    clock = setInterval(() => (now.value = Date.now()), 30_000);
});

onUnmounted(() => {
    clearInterval(clock);
    if (ws.value) {
        ws.value.close();
    }
});

// Computed property to calculate age
const age = computed(() => {
    const birthDate = new Date('1999-09-20'); // Replace with your actual birth date
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
});

const statusDot = computed(() => ({
    online: "bg-one-dark-green",
    idle: "bg-one-dark-yellow",
    dnd: "bg-one-dark-red",
}[presence.value] || "bg-one-dark-gray"));

const statusLabel = computed(() => ({
    online: "Online",
    idle: "Away",
    dnd: "Do not disturb",
}[presence.value] || "Offline"));

const activity = computed(() => vscode.value || cursor.value);
const activityApp = computed(() => (vscode.value ? "VS Code" : "Cursor"));

const baliTime = computed(() =>
    new Date(now.value).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Makassar",
    })
);

// Computed property to calculate the time difference
const timeDiff = computed(() => {
    const activeActivity = vscode.value || cursor.value;

    if (
        !activeActivity ||
        !activeActivity.timestamps ||
        !activeActivity.timestamps.start
    ) {
        return "not working on anything right now";
    }

    const startDate = new Date(activeActivity.timestamps.start);
    const diffInMilliseconds = now.value - startDate;

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

<style scoped>
.glow-effect {
    box-shadow: 0 0 100px 5px rgba(255, 160, 0, 0.3);
}
</style>
