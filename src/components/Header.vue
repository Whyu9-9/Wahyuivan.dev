<template>
    <div class="grid grid-cols-1 md:grid-cols-2 mb-3 mt-5 justify-center">
        <div class="flex flex-col">
            <h1 class="font-sans font-black text-4xl md:text-5xl mb-4 mt-5">
                Hi, I'm
                <!-- See CV Button -->
                <a :class="['text-4xl md:text-5xl underline', status]"
                    href="https://docs.google.com/document/d/1P-8tGI_fHPG6Afj4WaU89pA1ZpRtZz-uzf164pvGYIk/edit?usp=sharing"
                    target="_blank" rel="noopener noreferrer">
                    Wahyu
                </a>
            </h1>
            <vue-typewriter-effect pauseFor="3000" :class="['mb-3 text-xs md:text-sm', status]" :strings="[
                'console.log(&quot;Welcome to my page!&quot;);',
                'print(&quot;Welcome to my page!&quot;)',
                '&lt;?php echo &quot;Welcome to my page!&quot;; ?&gt;',
                'System.out.println(&quot;Welcome to my page!&quot;);',
                'printf(&quot;Welcome to my page!\\n&quot;);',
                'std::cout &lt;&lt; &quot;Welcome to my page!&quot; &lt;&lt; std::endl;',
                'puts &quot;Welcome to my page!&quot;',
                'fmt.Println(&quot;Welcome to my page!&quot;)',
                'println(&quot;Welcome to my page!&quot;)',
                'print(&quot;Welcome to my page!&quot;)',
                'echo &quot;Welcome to my page!&quot;;',
                'Console.WriteLine(&quot;Welcome to my page!&quot;);',
                'echo &quot;Welcome to my page!&quot;',
                'document.write(&quot;Welcome to my page!&quot;); ',
                'cat &quot;Hello, World!&quot;',
                'write-host &quot;Hello, World!&quot;',
            ]" />

            <div class="mt-3 mb-3 text-sm md:text-lg text-justify">
                I'm a passionate {{ age }}-years-old
                full-time software engineer by day,
                <a href="https://www.youtube.com/@wahyuivan9" target="_blank" rel="noopener noreferrer"
                    class="underline">tech content creator</a>
                by night, and a full-time tech enthusiast living in Bali,
                Indonesia 🌴
            </div>
            <div class="flex items-center gap-2 text-sm text-one-dark-foreground mt-3">
                <font-awesome-icon :icon="['fas', 'laptop-code']" class="w-5 h-5 mr-1" />
                <div>
                    I'm currently working at
                    <a :href="`https://www.incentro.com/en`" target="_blank" rel="noopener noreferrer"
                        class="font-black underline">Incentro</a>
                </div>
            </div>
            <div class="flex items-center gap-2 text-sm text-one-dark-foreground mt-3 md:text-justify">
                <font-awesome-icon :icon="['fas', 'code']" class="w-5 h-5 mr-1" />
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
                <div v-else-if="cursor">
                    Currently vibe coding since:
                    <span class="font-black">{{
                        new Date(cursor.timestamps.start).toLocaleString(
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
            <div class="flex gap-4 mt-8 text-xl md:text-2xl md:gap-5 md:mx-0">
                <a v-for="(link, key) in socials" :key="key" :href="link" :alt="key" target="_blank"
                    rel="noopener noreferrer" class="relative group">
                    <!-- Font Awesome Icon -->
                    <font-awesome-icon :icon="[
                        'fab',
                        key === 'X' ? 'x-twitter' : key.toLowerCase(),
                    ]" />

                    <!-- Tooltip -->
                    <span
                        class="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs font-medium text-one-dark-bg bg-one-dark-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
                        {{ key }}
                        <span
                            class="absolute w-2 h-2 bg-one-dark-foreground rotate-45 transform -translate-x-1/2 left-1/2 bottom-full -mb-1"></span>
                    </span>
                </a>
            </div>
        </div>
        <div class="relative group">
            <!-- Profile Image -->
            <div v-lazy-container="{ selector: 'img' }" class="lg:-mr-32">
                <img data-src="https://storage.wahyuivan.dev/profile.webp"
                    class="w-72 lg:w-80 lg:h-[23rem] rounded my-10 mx-auto h-96 object-cover hidden md:block glow-effect"
                    alt="Profile Picture" fetchpriority="high" loading="eager" decoding="async" as="image" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import VueTypewriterEffect from "vue-typewriter-effect";

const ws = ref(null);
const status = ref("text-one-dark-foreground");
const vscode = ref(null);
const cursor = ref(null);
const isConnected = ref(false);
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
            isConnected.value = true;
            reconnectAttempts.value = 0;
            try {
                ws.value.send(
                    JSON.stringify({
                        op: 2,
                        d: { subscribe_to_id: import.meta.env.VITE_DISCORD_ID },
                    })
                );
            } catch (sendError) {
                console.error(
                    "Error sending message via WebSocket:",
                    sendError
                );
            }
        };

        ws.value.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") {
                    const presence = data.d;

                    vscode.value = presence.activities.find((activity) =>
                        activity.name.toLowerCase().includes("code")
                    );

                    cursor.value = presence.activities.find((activity) =>
                        activity.name.toLowerCase().includes("cursor")
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
                            status.value = "text-one-dark-foreground";
                            break;
                    }
                }
            } catch (messageError) {
                console.error(
                    "Error handling WebSocket message:",
                    messageError
                );
            }
        };

        ws.value.onerror = (error) => {
            console.error("WebSocket Error:", error);
            isConnected.value = false;
        };

        ws.value.onclose = (event) => {
            console.log("WebSocket connection closed:", event.code, event.reason);
            isConnected.value = false;

            // Attempt to reconnect if not a normal closure
            if (event.code !== 1000 && reconnectAttempts.value < maxReconnectAttempts) {
                reconnectAttempts.value++;
                setTimeout(() => {
                    console.log(`Attempting to reconnect (${reconnectAttempts.value}/${maxReconnectAttempts})`);
                    connectWebSocket();
                }, reconnectDelay * reconnectAttempts.value);
            }
        };
    } catch (connectionError) {
        console.error(
            "Error establishing WebSocket connection:",
            connectionError
        );
        isConnected.value = false;
    }
};

onMounted(async () => {
    connectWebSocket();
});

onUnmounted(() => {
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
<style scoped>
.glow-effect {
    box-shadow: 0 0 100px 5px rgba(255, 160, 0, 0.3);
}
</style>
