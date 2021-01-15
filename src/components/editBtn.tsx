import React from "react";
import { Badge } from "react-bootstrap";

export interface EditBtnProps {
    title: string,
    onClick: () => void
}

export const EditBtn = ({ title, onClick }: EditBtnProps) =>
    <Badge pill variant="info" onClick={onClick} role="button">{title}</Badge>