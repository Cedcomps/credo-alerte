import NextLogo from "./NextLogo";
import CredoAlertLogo from "./CredoAlertLogo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex mt-12 gap-4 justify-center items-center">
          <CredoAlertLogo />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
        </a>
      </div>
      <h1 className="sr-only">CredoAlert - Your Emergency Notification Sending Solution</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
      Be ready to react quickly in a crisis with our instant notification system{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Next.js
        </a>
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
