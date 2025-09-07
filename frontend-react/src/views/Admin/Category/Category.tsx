import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";
import CategoryDetails from "./CategoryDetails";

const Category: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="list" element={<CategoryList />} />
                <Route path="form" element={<CategoryForm />} />
                <Route path=":id" element={<CategoryDetails />} />
                <Route index element={<Navigate to="list" replace />} />
            </Routes>
        </>
    );
}

export default Category;