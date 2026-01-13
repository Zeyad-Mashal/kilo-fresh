const URL = "https://kilo-fresh-back.vercel.app/api/cart/getItems";
const GetCartItems = async (cartId, setCartItems, setError, setLoading) => {
    setLoading(true)
    try {
        if (!cartId) {
            setError('معرف السلة مطلوب');
            setLoading(false);
            return;
        }

        const response = await fetch(`${URL}?cartId=${cartId}`, {
            method: 'GET',
        });

        const result = await response.json();

        if (response.ok) {
            setCartItems(result.cartItems || result.items || [])
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
        setError('حدث خطأ في الاتصال');
        setLoading(false)
    }
}
export default GetCartItems;

