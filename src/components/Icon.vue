<template>
    <svg :viewBox="`0 0 ${definition.icon[0]} ${definition.icon[1]}`" aria-hidden="true" focusable="false"
        class="inline-block h-[1em] w-auto overflow-visible fill-current align-[-0.125em]">
        <path :d="definition.icon[4]" />
    </svg>
</template>

<script>
// Renders Font Awesome path data directly, without fontawesome-svg-core's runtime.
// Add an icon here before using it as <Icon :icon="['fab', 'name']" />.
import { faStar, faCodeBranch, faCode, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faInstagram, faTiktok, faMedium, faYoutube, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const icons = Object.fromEntries(
    [faStar, faCodeBranch, faCode, faLocationDot, faGithub, faLinkedin, faInstagram, faTiktok, faMedium, faYoutube, faXTwitter]
        .map((icon) => [`${icon.prefix} ${icon.iconName}`, icon])
);
</script>

<script setup>
import { computed } from "vue";

const props = defineProps({ icon: { type: Array, required: true } });
const definition = computed(() => icons[props.icon.join(" ")]);
</script>
