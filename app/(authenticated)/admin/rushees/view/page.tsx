import RusheeDetails from "@/components/admin/rushee/RusheeDetails";

interface PageProps {
  searchParams: Promise<{ rusheeId?: string }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const rusheeId = searchParams.rusheeId;
  if (!rusheeId) {
    return <p>No rushee ID provided.</p>;
  }
  return (
    <div>
      <RusheeDetails rusheeId={rusheeId} />
    </div>
  );
}
