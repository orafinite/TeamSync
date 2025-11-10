import { Separator } from "@/components/ui/separator";
import InviteMember from "@/components/workspace/member/invite-member";
import AllMembers from "@/components/workspace/member/all-members";

export default function Members() {
  return (
    <div className="w-full h-auto pt-2">
      <main>
        <div className="w-full max-w-3xl mx-auto pt-3">
          <span className="text-sm text-muted-foreground">
            <h1 className="text-2xl dark:text-white ">Team</h1>
            <p>Manage team members and their contributions</p>
          </span>
          <Separator className="my-4 !h-[0.5px]" />
          <AllMembers />
          <Separator className="my-4 !h-[0.5px]" />
          <InviteMember />
        </div>
      </main>
    </div>
  );
}
