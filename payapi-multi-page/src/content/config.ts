import { defineCollection, z } from "astro:content";

const featuresFooterCollection = defineCollection({
    type: "content",
    schema: ({ image }) => z.object({
        imgPath: image(),
        imgAlt: z.string(),
        header: z.string(),
        content: z.string(),
    })
})

const featuresMainCollection = defineCollection({
    type: "content",
    schema: ({ image }) => z.object({
        imgPath: image(),
        imgAlt: z.string(),
        header: z.string(),
        content: z.string(),
    })
})

export const collections = {
    featuresMain: featuresMainCollection,
    featuresFooter: featuresFooterCollection
}