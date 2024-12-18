import { useState } from "react";
import FormSignIn from "../components/FormSignIn";
import FormSignUp from "../components/FormSignUp";

const AuthPage = () => {
  const [formToShow, setFormToShow] = useState<"signin" | "signup">("signin");

  return (
    <section className="flex w-full">
      {/* Image Section */}
      <div className="flex-1">
        <img src="/assets/auth-img.png" className="w-full h-screen" alt="" />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Conditional rendering of forms */}
        {formToShow === "signin" && (
          <div className="flex flex-col items-center">
            <FormSignIn />
            <p className="mt-4">
              You don't have an account?{" "}
              <button
                className="text-violetDark hover:underline"
                onClick={() => setFormToShow("signup")}
              >
                Sign Up
              </button>
            </p>
          </div>
        )}

        {formToShow === "signup" && (
          <div className="flex flex-col items-center">
            <FormSignUp />
            <p className="mt-4">
              Already have an account?{" "}
              <button
                className="text-violetDark hover:underline"
                onClick={() => setFormToShow("signin")}
              >
                Sign In
              </button>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
