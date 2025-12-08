interface FixedBottomBarProps {
  children: React.ReactNode;
}

export default function FixedBottomBar({ children }: FixedBottomBarProps) {
  return (
    <div className="bg-gray-750 laptop:hidden fixed right-0 bottom-0 left-0 flex items-center gap-7 p-6">
      {children}
    </div>
  );
}
