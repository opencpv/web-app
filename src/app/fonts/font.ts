import { Inter, Lora, Source_Sans_3 } from 'next/font/google'
import localFont from 'next/font/local'
 
// define your variable fonts
const inter = Inter({subsets:['latin']})
const lora = Lora({subsets:['latin']})
// define 2 weights of a non-variable font
const sourceCodePro400 = Source_Sans_3({ subsets: ['latin'], weight: '400' })
const sourceCodePro700 = Source_Sans_3({ subsets: ['latin'], weight: '700' })
// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
const greatVibes = localFont({ src: './GeistMonoVF.woff',  })
 
export { inter, lora, sourceCodePro400, sourceCodePro700, greatVibes }