"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { login } from '@/app/auth/lib/action';
import { redirect } from 'next/navigation';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="font-bold w-full rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
      Log In
    </button>
  );
}

const LoginForm = () => {
  const users = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('nextjs-basic-auth-users') || '[]') : [];
  const [state, loginAction] = useActionState(login, users);

  useEffect(() => {
    if (state.success) {
      const { name, email, id } = state.data;
      localStorage.setItem('nextjs-basic-auth-current-user', JSON.stringify({ name, email, id }));
      redirect('/dashboard');
    }
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Log In</h2>
        <form action={loginAction} className="space-y-4">
          <div>
            <label htmlFor='email' className="block mb-1">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" className="w-full p-2 border rounded"
            />
          </div>
          {state?.errors?.email && (
            <p className="text-red-500">{state.errors.email[0]}</p>
          )}
          <div>
            <label htmlFor='password' className="block mb-1">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" className="w-full p-2 border rounded"
            />
          </div>
          {state?.errors?.password && (
            <p className="text-red-500">{state.errors.password[0]}</p>
          )}

          <SubmitButton />

          <a
            className="rounded-full border border-solid border-black/[.5] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/auth/signup"
          >
            Don&rsquo;t have an account? &nbsp;<b>Sign Up</b>
          </a>
        </form>
      </div>
    </div>
  )
}

export default LoginForm