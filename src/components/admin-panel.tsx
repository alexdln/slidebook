"use client";

import { useAuthentication } from "@/providers/authentication/hooks";

import { AdminControls } from "./admin-controls";
import { AdminAuth } from "./admin-auth";

export type AdminPanelProps = {
    children: React.ReactNode[];
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ children }) => {
    const { isAuthenticated } = useAuthentication();

    return <>{!isAuthenticated ? <AdminAuth /> : <AdminControls>{children}</AdminControls>}</>;
};
