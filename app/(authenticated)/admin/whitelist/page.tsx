import { createClient } from "@/utils/supabase/server";
import WhitelistCard from "@/components/whitelist/WhitelistCard";
import AddWhitelist from "@/components/whitelist/AddWhitelist";
export default async function WhiteListPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("email_whitelist").select("*");
  if (error) console.error(error);
  console.log(data);
  return (
    <div>
      <div className="flex items-center mb-4">
        <h1 className=" mr-4">Whitelist</h1>
        <AddWhitelist />
      </div>
      {data?.map((whitelist) => (
        <div key={whitelist.id} className="mb-4">
          <WhitelistCard id={whitelist.id} email={whitelist.email} />
        </div>
      ))}
    </div>
  );
}
