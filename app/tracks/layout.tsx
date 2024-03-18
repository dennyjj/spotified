import TopItemFooter from '@/app/ui/top-item-footer';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      {/* FIXME: spacing between children and footer */}
      <br />
      <br />
      <TopItemFooter itemType="tracks" />
    </div>
  );
}
