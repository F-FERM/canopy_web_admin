"use client";

import { createFooterApi } from "@/app/api/admin/footer/footer";
import FooterForm from "@/app/components/admin/FooterForm";
import { useRouter } from "next/navigation";


export default function CreateFooterPage() {
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        await createFooterApi(data);
        router.push("/admin/footer");
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Create Footer</h1>
            <FooterForm onSubmit={handleSubmit} />
        </div>
    );
}
