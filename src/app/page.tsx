import { SignedIn, SignedOut, SignInButton, SignUpButton, } from "@clerk/nextjs";
export default async function Home() {
  return (
    <div>
      <h1>Home</h1>
      <SignedIn>
        <div>
          <h2>Welcome back!</h2>
          <p>You are signed in.</p>
        </div>
      </SignedIn>
      <SignedOut>
        <div>
          <h2>Welcome!</h2>
          <p>You are not signed in.</p>
        </div>
        <SignInButton>
            Sign in
        </SignInButton>
        <SignUpButton>
            Sign up
        </SignUpButton>
      </SignedOut>
      </div>
     );
}
