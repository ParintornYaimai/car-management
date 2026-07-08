import './App.css'
import { Button, Card } from 'antd'

function App() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-4xl items-center justify-center">
        <Card className="w-full max-w-xl shadow-sm">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
              Car Management
            </p>
            <h1 className="text-3xl font-bold">Tailwind CSS + Ant Design is ready</h1>
            <p className="text-slate-600">
              This page uses Tailwind utility classes and an Ant Design component to verify
              the setup.
            </p>
            <Button type="primary">Ant Design Button</Button>
          </div>
        </Card>
      </div>
    </main>
  )
}

export default App
