"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";

import "./notes-panel.scss";

type NotesPanelProps = {
    notes?: React.ReactNode;
    children?: React.ReactNode;
};

const STORAGE_KEY = "notes-panel-settings";

export const NotesPanel: React.FC<NotesPanelProps> = ({ notes, children }) => {
    const [container, setContainer] = useState<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    const changeVisibleHandler = useCallback((newVisible: boolean) => {
        setVisible(newVisible);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ visible: newVisible }));
    }, []);

    useEffect(() => {
        window.dispatchEvent(new Event("resize"));
    }, [visible]);

    useEffect(() => {
        const el = document.querySelector<HTMLElement>(".slide-layer__notes");
        setContainer(el);

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (typeof parsed.visible === "boolean") changeVisibleHandler(parsed.visible);
            } catch {}
        }
    }, []);

    if (!container) return null;

    return createPortal(
        <>
            <button className="notes-toggle-button" onClick={() => changeVisibleHandler(!visible)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M16 13H8M16 17H8M10 9H8M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="notes-toggle-button__text">Notes</span>
            </button>
            {visible && (
                <div className="notes-panel">
                    <div className="notes-header">
                        <span>Notes</span>
                        <div className="notes-actions">
                            <button className="notes-actions__button" onClick={() => changeVisibleHandler(false)}>
                                Hide
                            </button>
                        </div>
                    </div>
                    <div className="notes-content">{children ?? notes ?? <i>No notes</i>}</div>
                </div>
            )}
        </>,
        container,
    );
};
