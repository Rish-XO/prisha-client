import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/api";

export const trpc = createTRPCReact<AppRouter>();

