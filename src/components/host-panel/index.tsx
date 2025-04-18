"use client";

import { useAuthentication } from "@/providers/authentication/hooks";

import { HostControls } from "../host-controls";
import { HostAuth } from "../host-auth";

export type HostPanelProps = {
    children: React.ReactNode[];
    notes: React.ReactNode[];
};

export const HostPanel: React.FC<HostPanelProps> = ({ children, notes }) => {
    const { isAuthenticated } = useAuthentication();

    return <>{!isAuthenticated ? <HostAuth /> : <HostControls notes={notes}>{children}</HostControls>}</>;
};
