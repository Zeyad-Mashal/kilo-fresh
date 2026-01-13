const URL = "https://kilo-fresh-back.vercel.app/api/products/product/offers";
const GetProductsOffers = async (setAllOffers, setError, setLoading) => {
    setLoading(true)
    try {
        const response = await fetch(URL, {
            method: 'GET',
        });

        const result = await response.json();

        if (response.ok) {
            setAllOffers(result.products || result.offers || [])
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
        setError('حدث خطأ');
        setLoading(false)
    }
}
export default GetProductsOffers;

