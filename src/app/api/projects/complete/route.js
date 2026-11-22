import { projectService } from "../../../lib/project-upload-server";

export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(request) { return projectService().complete(request); }
