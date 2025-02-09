import "./globals.css"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Gift Idea Generator",
  description: "Get personalized gift ideas for your loved ones",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}

