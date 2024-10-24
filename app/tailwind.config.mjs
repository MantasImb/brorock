/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: '#c1b18f',
				main: '#000000',
				text: '#ffffff',
				highlight: '#d7814b',
				secondary: '#050608',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}
