"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: records,
    error: countError,
    count: recordCount,
  } = await supabase
    .from("userData")
    .select("*", { count: "exact" })
    .eq("user_id", user?.id);

  if (recordCount == 0) {
    return redirect("/protected");
  } else return redirect("/protected/home");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const insertUserDataAction = async (formData: FormData) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const gender = formData.get("gender");
  const weight = formData.get("weight");
  const height = formData.get("height");
  const age = formData.get("age");
  const activity =
    formData.get("activity") === "No exercise"
      ? 0
      : formData.get("activity") === "Light exercise (1 or 2 x week)"
        ? 1
        : formData.get("activity") === "Moderate exercise (3 or 5 x week)"
          ? 2
          : formData.get("activity") === "Heavy exercise (6 or 7 x week)"
            ? 3
            : formData.get("activity") === "Very heavy (Twice x day)"
              ? 4
              : -1;

  const { data, error } = await supabase.from("userData").insert([
    {
      user_id: user?.id,
      gender: gender,
      current_weight: weight,
      height: height,
      age: age,
      activity_level: activity,
    },
  ]);
  if (!error) {
    return redirect("/protected/home");
  }
};
