import QuickActionsCard from "../components/QuickActionsCard";

export default function AdminMobileMenuList({ onClick }) {
  return (
    <>
      <QuickActionsCard onClick={onClick} link="profile" title="My Profile" />
      <QuickActionsCard onClick={onClick} link="" title="Add Users" />
      <QuickActionsCard onClick={onClick} link="" title="All Users" />
      <QuickActionsCard onClick={onClick} link="" title="Settings" />
    </>
  );
}
