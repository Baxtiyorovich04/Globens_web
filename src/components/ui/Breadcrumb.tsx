"use client";

import React from "react";
import Link from "next/link";
import styles from "./Breadcrumb.module.scss";
import type { BreadcrumbProps } from "@/types/breadcrumb";

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className={styles.breadcrumb}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className={styles.separator}> / </span>}
          {item.href && !item.isActive ? (
            <Link href={item.href} className={styles.breadcrumbItem}>
              {item.label}
            </Link>
          ) : (
            <span className={`${styles.breadcrumbItem} ${item.isActive ? styles.active : ''}`}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
} 