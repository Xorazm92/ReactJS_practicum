import { useQuery } from "@tanstack/react-query"
import { api } from "../../../config/request"

export const useGetUserCheck = () => {
  return useQuery({
    queryKey: ["userCheck"],
    queryFn: async () => {
      try {
        // Use the correct API endpoint path
        const response = await api.get("/api/v1/auth/profile")
        return response.data
      } catch (error) {
        // Handle error but don't throw it to prevent blocking navigation
        console.error("Failed to check user profile:", error)
        return null
      }
    },
    retry: 1, // Only retry once to avoid too many failed requests
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    // Don't block navigation if this query fails
    throwOnError: false,
  })
}

