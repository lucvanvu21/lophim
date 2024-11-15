import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getAccessToken = async () => {
  const session: any = await getServerSession(authOptions);
  return session?.access_token || null; 
};