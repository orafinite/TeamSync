import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";

const AnalyticsCard = (props: {
  title: string;
  value: number;
  isLoading: boolean;
  icon: React.ReactNode;
}) => {
  const { title, value, isLoading, icon } = props;
  return (
    <Card className="shadow-none w-full bg-white dark:bg-zinc-950 dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition duration-200 rounded-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-1.5">
        <div className="flex items-center gap-1">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
        {icon}
      </CardHeader>
      <CardContent className="w-full">
        <div className="text-3xl font-bold">
          {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : value}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
