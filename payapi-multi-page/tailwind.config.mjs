/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			'pr-dark-pink': '#ba4270',
			'pr-water-white': '#fbfcfe',
			'sec-sanjuan-blue': '#36536b',
			'sec-mirage-blue': '#1b262f',
			'sec-charm-pink': '#da6d97',
			'sec-lightsanjuan-blue': '#6c8294'
		},
		fontFamily: {
			serifDisplay: ['DM Serif Display'],
			publicSans: ['Public Sans']
		},
		extend: {},
	},
	plugins: [],
}
