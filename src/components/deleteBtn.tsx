import React from "react";
import { Badge } from "react-bootstrap";

export interface EditBtnProps {
    title: string,
    onClick: () => void
}

export const DeleteBtn = ({ title, onClick }: EditBtnProps) =>
    <Badge pill variant="danger" onClick={onClick} role="button">{title}</Badge>