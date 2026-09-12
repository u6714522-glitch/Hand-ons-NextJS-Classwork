import { verifyJWT } from "@/app/lib/auth";
import { errorResponse, successResponse } from "@/app/lib/utils";
import corsHeaders from "@/app/lib/cors";

export function GET(request) {
  const user = verifyJWT(request);

  if (!user) {
    return errorResponse("Unauthorized", 401);
  }

  return successResponse(user, {
    status: 201,
    headers: { corsHeaders },
  });
}
