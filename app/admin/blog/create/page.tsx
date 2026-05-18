"use client";

import { createBlogLanding } from "@/app/api/admin/blog/landing";
import BlogLandingForm from "@/app/components/admin/BlogLandingForm";
import { useRouter } from "next/navigation";


export default function CreateBlogLandingPage() {
    const router = useRouter();

    return (
        <BlogLandingForm
            onSubmit={async (data) => {
                await createBlogLanding(data);
                router.push("/admin/blog");
            }}
        />
    );
}
