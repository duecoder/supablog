import React from "react";
import supabase from "../utils/supabase";

function LoginPage() {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = document.getElementById("form");
    const email = e.target.email.value;
    await supabase.auth.signInWithOtp({ email });

    form.reset();
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} id="form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
