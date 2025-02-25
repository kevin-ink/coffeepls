import SignupForm from "@/components/signup-form";

export default function SignUp() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm border-2 rounded-lg p-3 md:p-6 bg-white font">
        <SignupForm />
      </div>
    </div>
  );
}
