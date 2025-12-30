import QuickActionsCard from "../components/QuickActionsCard";

export default function EngineerMobileMenuList({ onClick }) {
  return (
    <>
      <QuickActionsCard onClick={onClick} link="profile" title="My Profile" />
      <QuickActionsCard onClick={onClick} link="hardware" title="Shops" />
      <QuickActionsCard
        onClick={onClick}
        link="received-applications"
        title="Applications"
      />
      <QuickActionsCard onClick={onClick} link="sites" title="My Sites" />
      <QuickActionsCard onClick={onClick} link="add-site" title="Add Site" />
      <QuickActionsCard onClick={onClick} link="" title="Favorite Products" />
      <QuickActionsCard onClick={onClick} link="settings" title="Settings" />
    </>
  );
}
