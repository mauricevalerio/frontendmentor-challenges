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

const aboutCollection = defineCollection({
    type: "content",
    schema: ({ image }) => z.object({
        header: z.string(),
        gridContentUpper: z.array(z.object({
            header: z.string(),
            description: z.string()
        })),
        desktopImgPath: image(),
        tabletImgPath: image(),
        mobileImgPath: image(),
        imgAlt: z.string(),
        companyMetrics: z.array(z.object({
            description: z.string(),
            metric: z.string()
        })),
        gridContentLower: z.array(z.object({
            header: z.string(),
            description: z.string()
        }))
    })
})

export const collections = {
    featuresMain: featuresMainCollection,
    featuresFooter: featuresFooterCollection,
    pricingPlan: pricingPlanCollection,
    about: aboutCollection
}