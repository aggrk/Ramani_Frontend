import QuickActionsCard from "../components/QuickActionsCard";

export default function DealerMobileMenuList({ onClick }) {
  return (
    <>
      <QuickActionsCard onClick={onClick} link="profile" title="My Profile" />
      <QuickActionsCard onClick={onClick} link="my-shops" title="My Shops" />
      <QuickActionsCard onClick={onClick} link="sites" title="Sites" />
      <QuickActionsCard onClick={onClick} link="settings" title="Settings" />
    </>
  );
}
