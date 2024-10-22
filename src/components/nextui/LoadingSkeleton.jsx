import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function LoadingSkeleton() {
  return (
    <Card className="w-full space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-10 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-40 rounded-lg">
          <div className="h-10 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
