import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-12
                   dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}

