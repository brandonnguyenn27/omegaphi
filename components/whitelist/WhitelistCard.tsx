import DeleteWhitelist from "./DeleteWhitelist";
type WhitelistCardProps = {
  id: string;
  email: string;
};
export default function WhitelistCard({ id, email }: WhitelistCardProps) {
  return (
    <div className="flex border border-gray-200 p-4 rounded-lg items-center justify-between w-full">
      <h1>{email}</h1>
      <DeleteWhitelist id={id} />
    </div>
  );
}
