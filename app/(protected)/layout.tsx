import Navbar from '@/app/(protected)/_components/navbar';

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center gap-y-10 bg-green-200'>
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default ProtectedLayout;
