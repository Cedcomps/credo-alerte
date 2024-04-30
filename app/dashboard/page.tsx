import UserInfo from "@/components/UserInfo";
import OnboardingTaskListWrapper from "@/components/onboarding/OnboardingTaskListWrapper";

export default function Dashboard() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-5">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-4">
            <div className="grid gap-4 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-2">
              {/* <UserInfo/> */}
              <OnboardingTaskListWrapper />
            </div>
        </div>
        </main>
  );
}
