import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/contexts/AuthContext";
import domainService from "@/services/domainService";

export const useDomains = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["domains", user?.id],
    queryFn: domainService.getDomains,
    enabled: !!user, // Only fetch domains if the user is logged in
  });
};
