const URL = "https://kilo-fresh-back.vercel.app/api/products/product/";
const GetProductById = async (setProduct, setError, setLoading, productId) => {
    setLoading(true)
    try {
        const response = await fetch(URL + productId, {
            method: 'GET',
        });

        const result = await response.json();

        if (response.ok) {
            setProduct(result.product)
            setLoading(false)

        } else {
            if (response.status == 400) {
                setError(result.message);
                setLoading(false)

            } else if (response.status == 403) {
                setError(result.message);
                setLoading(false)
            } else if (response.status == 404) {
                setError(result.message || 'Product not found');
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
export default GetProductById;

