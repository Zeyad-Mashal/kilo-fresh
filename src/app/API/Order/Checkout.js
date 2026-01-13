const URL = "https://kilo-fresh-back.vercel.app/api/order/checkout";
const Checkout = async (orderData, setSuccess, setError, setLoading) => {
    setLoading(true)
    try {
        const { name, phone, address, cartId, shipping } = orderData;

        if (!name || !phone || !address || !cartId) {
            setError('الاسم ورقم الهاتف والعنوان ومعرف السلة مطلوبون');
            setLoading(false);
            return;
        }

        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                address: address,
                cartId: cartId,
                shipping: shipping || 50
            })
        });

        const result = await response.json();

        if (response.ok) {
            setSuccess(result.message || 'تم إتمام الطلب بنجاح')
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
export default Checkout;

