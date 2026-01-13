const URL = "https://kilo-fresh-back.vercel.app/api/cart/updateQuantity/";
const UpdateQuantity = async (itemId, quantity, setSuccess, setError, setLoading) => {
    setLoading(true)
    try {
        if (!quantity || quantity < 1) {
            setError('الكمية يجب أن تكون 1 على الأقل');
            setLoading(false);
            return;
        }

        const response = await fetch(URL + itemId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: parseInt(quantity)
            })
        });

        const result = await response.json();

        if (response.ok) {
            setSuccess(result.message || 'تم التحديث بنجاح')
            setLoading(false)
        } else {
            if (response.status == 400) {
                setError(result.message || 'فشلت العملية');
                setLoading(false)
            } else if (response.status == 404) {
                setError(result.message || 'عنصر السلة غير موجود');
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
export default UpdateQuantity;

