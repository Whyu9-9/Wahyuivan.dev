<template>
    <h2 class="mb-3 font-black text-2xl">~/projects/</h2>
    <div class="relative w-full">
        <!-- Carousel Items -->
        <div
            class="w-full h-full overflow-hidden relative border-one-dark-white[0.5px]"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
        >
            <div
                v-for="(slide, index) in slides"
                :key="index"
                :class="`carousel-item flex w-full relative ${
                    index === currentSlide ? '' : 'hidden'
                }`"
                @click="openModal(slide)"
            >
                <img
                    :src="slide.src"
                    :alt="`Slide ${index + 1}`"
                    class="w-full h-64 object-cover cursor-pointer"
                />

                <!-- Overlay -->
                <div
                    class="absolute bottom-0 w-full p-4 bg-gradient-to-t from-one-dark-bg via-one-dark-bg/70 to-transparent backdrop-blur-[2px]"
                >
                    <h3 class="text-xl font-bold font-sans md:text-2xl">
                        {{ slide.title }}
                    </h3>
                    <p class="text-xs text-one-dark-white md:text-sm">
                        {{ slide.desc }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Indicators -->
        <div class="indicators flex justify-center space-x-2 mt-4">
            <span
                v-for="(slide, index) in slides"
                :key="index"
                @click="goToSlide(index)"
                :class="`w-2 h-2 rounded-full cursor-pointer ${
                    index === currentSlide
                        ? 'bg-one-dark-green'
                        : 'bg-one-dark-white'
                }`"
                class="hidden md:block"
            ></span>
        </div>
    </div>

    <!-- Modal for larger image -->
    <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 bg-one-dark-bg bg-opacity-80 backdrop-blur-md flex justify-center items-center"
        @click.self="closeModal"
    >
        <div class="relative">
            <img
                :src="selectedSlide.src"
                :alt="selectedSlide.title"
                class="w-full h-96 object-scale-down px-3"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Carousel data with titles and descriptions
const slides = ref([
    {
        src: "https://pub-d57d4a3755f846b1b0e7353728ebbc1e.r2.dev/Picture1.webp",
        title: "Alengkong Bali Camp",
        desc: "An interactive website to ease up user booking process for Alengkong Bali Camp.",
    },
    {
        src: "https://pub-d57d4a3755f846b1b0e7353728ebbc1e.r2.dev/Picture2.webp",
        title: "Claudia Fitness",
        desc: "An admin dashboard for Claudia Fitness to manage clients, orders, and payments.",
    },
    {
        src: "https://pub-d57d4a3755f846b1b0e7353728ebbc1e.r2.dev/Picture3.webp",
        title: "MyTISI Gobolabali",
        desc: "An admin dashboard for MyTISI Gobolabali to manage players, teams, and matches.",
    },
    {
        src: "https://pub-d57d4a3755f846b1b0e7353728ebbc1e.r2.dev/Picture4.webp",
        title: "PT. Pancoran Mas",
        desc: "An admin dashboard for PT. Pancoran Mas to manage LPG sales and inventory.",
    },
    {
        src: "https://pub-d57d4a3755f846b1b0e7353728ebbc1e.r2.dev/Picture5.webp",
        title: "ASDP Indonesia Ferry",
        desc: "An admin dashboard for ASDP Indonesia Ferry to manage blog posts and comments.",
    },
    {
        src: "https://pub-d57d4a3755f846b1b0e7353728ebbc1e.r2.dev/Screenshot%202024-10-06%20at%2010.11.37.webp",
        title: "Chrome Built-in AI",
        desc: "An experimental Chrome feature to use AI directly in the browser.",
    },
]);

const currentSlide = ref(0);
let autoSlideInterval = null;

// Swipe functionality
let startX = 0;
let endX = 0;

const onTouchStart = (event) => {
    startX = event.touches[0].clientX;
};

const onTouchMove = (event) => {
    endX = event.touches[0].clientX;
};

const onTouchEnd = () => {
    if (startX > endX + 50) {
        nextSlide(); // Swipe left
    } else if (startX < endX - 50) {
        prevSlide(); // Swipe right
    }
};

// Functions for slide control
const prevSlide = () => {
    resetAutoSlide();
    currentSlide.value =
        currentSlide.value === 0
            ? slides.value.length - 1
            : currentSlide.value - 1;
};

const nextSlide = () => {
    resetAutoSlide();
    currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const goToSlide = (index) => {
    resetAutoSlide();
    currentSlide.value = index;
};

// Auto-slide logic
const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 7000); // Change slide every 7 seconds
};

const resetAutoSlide = () => {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        startAutoSlide(); // Restart auto-slide after manual control
    }
};

// Modal logic
const isModalOpen = ref(false);
const selectedSlide = ref({ src: "", title: "" });

const openModal = (slide) => {
    selectedSlide.value = slide;
    isModalOpen.value = true;
    document.body.style.overflow = "hidden"; // Disable scroll when modal is open
};

const closeModal = () => {
    isModalOpen.value = false;
    document.body.style.overflow = ""; // Restore scroll when modal is closed
};

// Lifecycle hooks
onMounted(() => {
    startAutoSlide(); // Start the auto-slide when the component is mounted
});

onBeforeUnmount(() => {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval); // Clean up the interval on component unmount
    }
});
</script>

<style scoped>
.carousel-item {
    transition: opacity 5s ease-in-out;
}

/* Blur effect on the background when modal is open */
.backdrop-blur-md {
    backdrop-filter: blur(10px);
}
</style>
