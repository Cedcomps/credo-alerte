// app/ui/fonts.ts
import { Titillium_Web } from 'next/font/google';

export const titilliumWeb = Titillium_Web({
    subsets: ['latin'],
    variable: '--font-titillium-web',
    weight: '200'
});