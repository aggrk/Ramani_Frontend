import QuickActionsCard from "../components/QuickActionsCard";

export default function UserMobileMenuList({ onClick }) {
  return (
    <>
      <QuickActionsCard onClick={onClick} link="profile" title="My Profile" />
      <QuickActionsCard onClick={onClick} link="hardware" title="Shops" />
      <QuickActionsCard onClick={onClick} link="sites" title="Sites" />
      <QuickActionsCard
        onClick={onClick}
        link="applications"
        title="My Applications"
      />
      <QuickActionsCard onClick={onClick} link="" title="Favorite Products" />
      <QuickActionsCard onClick={onClick} link="settings" title="Settings" />
    </>
  );
}
