import RegisterForm from "@/components/dashboard/register-form"

export default function RegisterPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-2 py-12 
                   dark:bg-gray-800 transition-colors duration-300">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  ) 
}

