



export default function authlayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){


    return (<div className="flex justify-center items-center h-full">
        {children}
    </div>);
}