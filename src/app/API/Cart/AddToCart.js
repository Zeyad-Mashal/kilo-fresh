const URL = "https://kilo-fresh-back.vercel.app/api/addToCart";
const AddToCart = async (productId, cartId, quantity, setSuccess, setError, setLoading) => {
    setLoading(true)
    try {
        if (!productId || !cartId) {
            setError('معرف المنتج ومعرف السلة مطلوبان');
            setLoading(false);
            return;
        }

        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: productId,
                cartId: cartId,
                quantity: quantity || 1
            })
        });

        const result = await response.json();

        if (response.ok) {
            setSuccess(result.message || 'تمت الإضافة للسلة بنجاح')
            setLoading(false)
        } else {
            if (response.status == 400) {
                setError(result.message || 'فشلت العملية');
                setLoading(false)
            } else if (response.status == 404) {
                setError(result.message || 'المنتج غير موجود');
                setLoading(false)
            } else if (response.status == 403) {
                setError(result.message || 'غير مصرح');
                setLoading(false)
            } else {
                setError(result.message || 'حدث خطأ');
                setLoading(false)
            }
        }
    } catch (error) {
        setError('حدث خطأ في الاتصال');
        setLoading(false)
    }
}
export default AddToCart;

