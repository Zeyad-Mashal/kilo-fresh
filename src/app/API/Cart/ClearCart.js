const URL = "https://kilo-fresh-back.vercel.app/api/cart/clear";
const ClearCart = async (cartId, setSuccess, setError, setLoading) => {
    setLoading(true)
    try {
        if (!cartId) {
            setError('معرف السلة مطلوب');
            setLoading(false);
            return;
        }

        const response = await fetch(`${URL}?cartId=${cartId}`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (response.ok) {
            setSuccess(result.message || 'تم تفريغ السلة بنجاح')
            setLoading(false)
        } else {
            if (response.status == 400) {
                setError(result.message || 'فشلت العملية');
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
export default ClearCart;

