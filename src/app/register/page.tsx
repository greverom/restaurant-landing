import RegisterForm from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf7f2] px-4 py-12 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  )
}

