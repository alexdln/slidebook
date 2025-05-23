import { changeTheme, getTheme } from "@/lib/theming";

export const ThemeDetector: React.FC = () => (
    <script
        dangerouslySetInnerHTML={{
            __html: `(${changeTheme.toString()})((${getTheme.toString()})())`,
        }}
        suppressHydrationWarning
    />
);
