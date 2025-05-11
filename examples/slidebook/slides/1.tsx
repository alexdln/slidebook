"use client";

import { Fragment } from "@slidebook/core/lib";
import { motion } from "framer-motion";

export const Slide = () => (
    <div className="text-center">
        <Fragment index={1}>
            <motion.h1
                className="text-4xl font-bold mb-8"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Welcome to the Slidebook
            </motion.h1>
        </Fragment>
        <Fragment index={2}>
            <motion.p
                className="text-xl text-slate-600"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                A real-time Advanced Presentation Tool
            </motion.p>
        </Fragment>
    </div>
);

export const Notes = () => (
    <div>
        Welcome to the Slidebook. This is a real-time presentation tool that allows you to create and share
        presentations with your audience.
    </div>
);
