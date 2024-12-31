import RusheeDetails from "@/components/admin/rushee/RusheeDetails";

export default async function Page({
  searchParams,
}: {
  searchParams: { rusheeId?: string };
}) {
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
