"use client";

import { useAuthentication } from "@/providers/authentication/hooks";

import { AdminControls } from "./admin-controls";
import { AdminAuth } from "./admin-auth";

export type AdminPanelProps = {
    children: React.ReactNode[];
    notes: React.ReactNode[];
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ children, notes }) => {
    const { isAuthenticated } = useAuthentication();

    return <>{!isAuthenticated ? <AdminAuth /> : <AdminControls notes={notes}>{children}</AdminControls>}</>;
};
