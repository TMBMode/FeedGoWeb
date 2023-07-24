import './globals.css'

export const metadata = {
  title: 'FeedGoWeb',
  description: 'Feed&Go Web Demo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        <div className="fixed bg-slate-950 w-screen h-screen flex flex-col justify-center items-center">
          {children}
        </div>
      </body>
    </html>
  )
}
