export const metadata = {
  title: 'NextJS Chat App',
  description: 'Join a chatroom and start talking with friends!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
