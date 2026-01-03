const BASE_URL = "https://kilo-fresh-back.vercel.app/api/categories";
export const getAllCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/category/getAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: "فشل في جلب الفئات",
            }));
            throw new Error(errorData.message || "فشل في جلب الفئات");
        }

        const data = await response.json();
        return {
            success: true,
            categories: data.categories,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || "حدث خطأ في الاتصال بالخادم",
        };
    }
};
