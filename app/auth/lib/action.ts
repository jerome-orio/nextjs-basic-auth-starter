"use server";


import { createSession, deleteSession } from '@/app/lib/session';
import { redirect } from 'next/navigation';
import { encryptSha256, encryptSha256WithSalt } from '@/app/lib/crypto';
import { loginSchema, signupSchema } from '@/app/auth/lib/definitions';

export async function signup(prevState: Record<string, unknown>, formData: FormData) {
  const result = signupSchema.safeParse(Object.fromEntries(formData));
  const users = prevState.users ?? prevState;

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      users: users
    };
  }

  const newUser = { ...result.data, id: Date.now().toString(), ...encryptSha256(result.data.password) };

  if (Array.isArray(users) && users.some((user: { email: string; }) => user.email === result.data.email)) {
    return {
      errors: {
        email: ["Email already exists"],
      },
      users: users
    };
  }

  await createSession(newUser.id);
  return { success: true, data: newUser, users: users }; //return to Signup form to save it in local storage
  //redirect("/dashboard");
}

export async function login(prevState: Record<string, unknown>, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  const users = prevState.users ?? prevState;

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      users: users
    };
  }

  const { email, password } = result.data;
  const user = Array.isArray(users) && users.find(u => u.email === email && u.password === encryptSha256WithSalt(password, u.salt).toString());

  if (!user) {
    return {
      errors: {
        password: ["Invalid email or password"],
      },
      users: users
    };
  }

  await createSession(user.id);
  return { success: true, data: user, users: users }; //return to Signup form to save it in local storage
  //redirect("/dashboard");
}

export async function logout() {
  console.log("Logout Hit!");
  await deleteSession();
  redirect("/");
}