import QuickActionsCard from "../components/QuickActionsCard";

export default function AdminMobileMenuList({ onClick }) {
  return (
    <>
      <QuickActionsCard onClick={onClick} link="profile" title="My Profile" />
      <QuickActionsCard onClick={onClick} link="add-user" title="Add Users" />
      <QuickActionsCard
        onClick={onClick}
        link="shops"
        title="Registered Shops"
      />
      <QuickActionsCard onClick={onClick} link="users" title="All Users" />
      <QuickActionsCard onClick={onClick} link="settings" title="Settings" />
    </>
  );
}
