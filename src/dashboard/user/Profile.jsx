import ProfileInformationDisplay from "../../components/ProfileInformationDisplay";
import PasswordUpdateSection from "../../components/PasswordUpdateSection";
import ProfileCard from "../../components/ProfileCard";

export default function Profile() {
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col items-start justify-between md:flex-row">
          <h1 className="text-2xl font-bold text-[#1A1A1A] sm:text-3xl lg:text-4xl">
            Profile Settings
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Left Column - Profile Card */}
          <ProfileCard />

          <div className="space-y-4 sm:space-y-6 lg:col-span-3">
            <ProfileInformationDisplay />
            <PasswordUpdateSection />
          </div>
        </div>
      </div>
    </div>
  );
}
