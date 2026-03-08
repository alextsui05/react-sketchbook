import { useSidebar } from '@/components/ui/sidebar';

export function SidebarToggle() {
  const { open, setOpen } = useSidebar();
  return (
    <button onClick={() => setOpen(!open)}>
      {open ? 'Close' : 'Open'} Sidebar
    </button>
  );
}
