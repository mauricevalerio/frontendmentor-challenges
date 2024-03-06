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

const pricingPlanCollection = defineCollection({
    type: "content",
    schema: z.object({
        type: z.string(),
        description: z.string(),
        price: z.number(),
        features: z.array(z.object({
            featureName: z.string(),
            isIncluded: z.boolean()
        }))
    })
})

export const collections = {
    featuresMain: featuresMainCollection,
    featuresFooter: featuresFooterCollection,
    pricingPlan: pricingPlanCollection
}