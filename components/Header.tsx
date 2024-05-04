import NextLogo from "./NextLogo";
import CredoAlertLogo from "./CredoAlertLogo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex mt-6 gap-4 justify-center items-center">
          <CredoAlertLogo />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
        </a>
      </div>

      <h1 className="text-foreground text-4xl sm:text-5xl sm:leading-none lg:text-7xl text-center"> 
        <span className="block text-[#E11D4800] bg-clip-text bg-gradient-to-t from-foreground to-foreground-light"> Crisis averted </span> 
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#E11D48] via-[#E11D48] to-[#ff4d6d] block"> With just one alert </span> 
      </h1>
      
      <p className="text-2xl lg:text-3xl !leading-tight mx-auto max-w-xl text-center">
      Be ready to react quickly in a crisis with our emergency notification system
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      <p className="pt-2 text-foreground my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg">CredoAlert is an Emergency Notification Sending Solution alternative</p>
    </div>
  );
}
