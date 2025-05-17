import { signIn } from "@/lib/auth";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
      <div className="bg-[#1A1A1A] p-8 rounded-2xl shadow-2xl border border-[#2E2E2E] w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#E7E7E7] mb-2">Welcome Back</h1>
          <p className="text-zinc-400">Sign in to continue to Nuvaria</p>
        </div>

        <div className="flex flex-col gap-4">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 px-4 rounded-xl hover:bg-zinc-200 transition-colors shadow-sm"
            >
              <FaGoogle className="text-xl" />
              Continue with Google
            </button>
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-[#24292e] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#2f363d] transition-colors shadow-sm"
            >
              <FaGithub className="text-xl" />
              Continue with GitHub
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
