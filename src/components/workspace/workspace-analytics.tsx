import useWorkspaceId from "@/hooks/use-workspace-id";
import AnalyticsCard from "./common/analytics-card";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceAnalyticsQueryFn } from "@/lib/api";
import { AlertTriangle, CheckCheck, Folder, UsersRound } from "lucide-react";

const WorkspaceAnalytics = () => {
  const workspaceId = useWorkspaceId();

  const { data, isPending } = useQuery({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: () => getWorkspaceAnalyticsQueryFn(workspaceId),
    staleTime: 0,
    enabled: !!workspaceId,
  });

  const analytics = data?.analytics;

  return (
    <div className="grid gap-4 md:gap-5 lg:grid-cols-2 xl:grid-cols-4">
      <AnalyticsCard
        isLoading={isPending}
        title="Total Projects"
        value={analytics?.totalTasks || 0}
        icon={
          <span className="bg-blue-500/10 bg-opacity-20 w-10 h-10 rounded-xl flex items-center justify-center">
            <Folder className="stroke-blue-600"/>
          </span>
        }
      />
      <AnalyticsCard
        isLoading={isPending}
        title="Total Task"
        value={analytics?.totalTasks || 0}
        icon={
          <span className="bg-violet-500/10 bg-opacity-20 w-10 h-10 rounded-xl flex items-center justify-center">
            <UsersRound className="stroke-violet-600"/>
          </span>
        }
      />
      <AnalyticsCard
        isLoading={isPending}
        title="Overdue Task"
        value={analytics?.overdueTasks || 0}
        icon={
          <span className="bg-red-500/10 bg-opacity-20 w-10 h-10 rounded-xl flex items-center justify-center">
            <AlertTriangle className="stroke-red-600"/>
          </span>
        }
      />
      <AnalyticsCard
        isLoading={isPending}
        title="Completed Task"
        value={analytics?.completedTasks || 0}
        icon={
          <span className="bg-green-500/10 bg-opacity-20 w-10 h-10 rounded-xl flex items-center justify-center">
            <CheckCheck className="stroke-green-600"/>
          </span>
        }
      />
    </div>
  );
};

export default WorkspaceAnalytics;
