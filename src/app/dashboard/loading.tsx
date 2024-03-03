import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-10 rounded w-[120px]" />
        <Skeleton className="h-10 rounded-md w-[120px]" />
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6">
        <Skeleton className="w-full sm:w-40 h-[200px]  rounded-md"></Skeleton>
        <Skeleton className="w-full sm:w-40 h-[200px]  rounded-md"></Skeleton>
        <Skeleton className="w-full sm:w-40 h-[200px]  rounded-md"></Skeleton>
      </div>
    </>
  );
}
