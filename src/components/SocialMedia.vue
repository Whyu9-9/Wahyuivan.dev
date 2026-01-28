<template>
    <div>
        <h2 class="mb-3 font-black text-2xl">~/content-showcase/</h2>
        <div class="grid md:grid-cols-2 gap-4">
            <!-- TikTok Section -->
            <div class="bg-[#202020]/[.3] border-[#504945] border-[0.5px] rounded-lg p-5">
                <div class="flex items-center gap-2 text-one-dark-foreground mb-3">
                    <font-awesome-icon :icon="['fab', 'tiktok']" class="text-xl" />
                    <span class="font-bold">TikTok</span>
                </div>
                <div class="social-embed flex justify-center items-center w-full overflow-hidden">
                    <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@wahyuivanmahendra"
                        data-unique-id="wahyuivanmahendra" data-embed-from="embed_page" data-embed-type="creator"
                        style="max-width: 100%; min-width: 200px;">
                        <section>
                            <a target="_blank"
                                href="https://www.tiktok.com/@wahyuivanmahendra?refer=creator_embed">@wahyuivanmahendra</a>
                        </section>
                    </blockquote>
                </div>
            </div>

            <!-- Instagram Section -->
            <div class="bg-[#202020]/[.3] border-[#504945] border-[0.5px] rounded-lg p-5">
                <div class="flex items-center gap-2 text-one-dark-foreground mb-3">
                    <font-awesome-icon :icon="['fab', 'instagram']" class="text-xl text-pink-500" />
                    <span class="font-bold">Instagram</span>
                </div>
                <div class="social-embed flex justify-center items-center w-full overflow-hidden">
                    <iframe class="instagram-embed w-full h-full rounded-lg"
                        src="https://www.instagram.com/why.u9/embed" frameborder="0" scrolling="no"
                        allowtransparency="true"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SocialMedia',
    data() {
        return {

        }
    },
    mounted() {
        // Load TikTok embed script
        const tiktokScript = document.createElement('script')
        tiktokScript.src = 'https://www.tiktok.com/embed.js'
        tiktokScript.async = true
        document.body.appendChild(tiktokScript)
    },
    unmounted() {
        // Clean up scripts when component is unmounted
        const scripts = document.getElementsByTagName('script')
        for (let script of scripts) {
            if (script.src.includes('tiktok.com/embed.js')) {
                script.remove()
            }
        }
    }
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.social-embed {
    height: 500px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
    :deep(.tiktok-embed) {
        width: 100% !important;
        min-width: 200px !important;
    }
}

.instagram-embed {
    max-height: 450px;
}
</style>