
import { useGetMeQuery } from "@/redux/features/auth/auth.api";

export const useAuth = () => {
  const { data, isLoading, error } = useGetMeQuery(undefined, {
   
  });

 
  const user = data?.data ?? null;

  return { user, isLoading, error };
};
