<template>
    <div>
        <h2 class="mb-3 font-black text-2xl">~/blogs/</h2>
        <div class="grid md:grid-cols-2 gap-4">
            <div v-if="!fetchedJson.length">Blogs could not be retrieved.</div>
            <a
                v-bind:key="blog.index"
                v-for="blog in fetchedJson.slice(0, 4)"
                :href="blog.link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col px-5 py-3 bg-[#202020]/[.3] border-[#504945] border-[0.5px] rounded-lg text-sm"
            >
                <!-- Blog Image (always on top) -->
                <div class="flex-shrink-0 w-full mb-3">
                    <img
                        :src="getBlogImage(blog) || profileImage"
                        class="rounded w-full lg:h-32 h-full object-contain lg:object-cover"
                        :alt="blog.title"
                    />
                </div>

                <!-- Blog Details (below image) -->
                <div class="flex-grow overflow-hidden">
                    <!-- Blog Title -->
                    <div
                        :class="['font-sans font-black', 'font-bold']"
                        class="whitespace-normal break-words mb-3 lg:text-xl text-lg"
                    >
                        {{ blog.title }}
                    </div>

                    <!-- Author, Published Date and Profile Image -->
                    <div
                        class="flex items-center gap-2 text-one-dark-gray mb-3"
                    >
                        <img :src="profileImage" class="rounded-full w-7 h-7" />
                        <span class="truncate font-sans text-xs">
                            {{ blog.author }}
                            <br />
                            {{
                                new Date(blog.pubDate).toLocaleString("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                })
                            }}
                        </span>
                    </div>

                    <!-- Blog Tags -->
                    <div class="flex flex-wrap gap-2 mt-3">
                        <div
                            v-for="tag in blog.categories"
                            :key="tag.index"
                            class="text-xs text-one-dark-blue"
                        >
                            #{{ tag }}
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { MediumArticles } from "medium-article-api";

const mediumArticles = MediumArticles();
const username = "@wahyuivan";
const fetchedJson = ref([]); // Initialize the fetchedJson as an empty array
const profileImage = ref(""); // Initialize the profileImage as an empty string

onMounted(async () => {
    try {
        const data = await mediumArticles.getData(username); // Fetch the data
        const profileImageUrl = await mediumArticles.getProfileImageUrl(
            username
        ); // Fetch the profile image URL
        fetchedJson.value = data.items; // Assign the fetched data to fetchedJson
        profileImage.value = profileImageUrl; // Assign the profile image URL to profileImage
    } catch (error) {
        // Optionally, you can set a message to indicate the error
        fetchedJson.value = []; // Set to empty if there's an error
    }
});

const getBlogImage = (blog) => {
    const description = blog["description"] || "";
    const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : null; // Return the first image URL, or null if no image
};
</script>
