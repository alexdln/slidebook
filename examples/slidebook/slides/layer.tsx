import "@slidebook/core/lib/assets/themes/orange.css";

export const Layer = ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-slate-100">{children}</div>;
};
