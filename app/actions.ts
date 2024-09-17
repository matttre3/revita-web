"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/database.types";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient<Database>();
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
  const supabase = createClient<Database>();

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

  if (user?.id){
    const {
      data: records,
      error: countError,
      count: recordCount,
    } = await supabase.from("userData").select("*").eq("user_id", user.id);
   
    console.log({ records });

    if (records && records?.length == 0) {
      return redirect("/protected");
    } else return redirect("/protected/home");
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient<Database>();
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
  const supabase = createClient<Database>();

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
  const supabase = createClient<Database>();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const insertUserDataAction = async (formData: FormData) => {
  const supabase = createClient<Database>();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const gender = parseInt(formData.get("gender")!.toString());
  const weight = parseInt(formData.get("weight")!.toString());
  const height = parseInt(formData.get("height")!.toString());
  const age = parseInt(formData.get("age")!.toString());
  const activity = parseInt(formData.get("activity")!.toString());

  if(user?.id && gender && weight && height && age && activity) {
    const { data, error } = await supabase.from("userData").insert(
    { 
      gender: gender,
      current_weight: weight,
      height: height,
      age: age,
      activity_level: activity,
      user_id: user?.id,
    } 
  );

  if (!error) {
    return redirect("/protected/home");
  }}
  
};
