const URL = "https://kilo-fresh-back.vercel.app/api/products/product/getByCategory/";
const GetByCategory = async (setProductsByCategory, setError, setLoading, categoryId) => {
    setLoading(true)
    try {
        const response = await fetch(URL + categoryId, {
            method: 'GET',
        });

        const result = await response.json();

        if (response.ok) {
            setProductsByCategory(result.products)
            setLoading(false)

        } else {
            if (response.status == 400) {
                setError(result.message);
                setLoading(false)

            } else if (response.status == 403) {
                setError(result.message);
                setLoading(false)
            } else {
                setError(result.message);
                setLoading(false)
            }
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)
    }
}
export default GetByCategory;