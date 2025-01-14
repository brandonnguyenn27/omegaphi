import RusheeDetails from "@/components/admin/rushee/RusheeDetails";

interface PageProps {
  searchParams: { rusheeId?: string };
}

export default async function Page({ searchParams }: PageProps) {
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
