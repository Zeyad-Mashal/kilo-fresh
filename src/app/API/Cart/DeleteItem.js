const URL = "https://kilo-fresh-back.vercel.app/api/cart/deleteItem/";
const DeleteItem = async (itemId, setSuccess, setError, setLoading) => {
    setLoading(true)
    try {
        const response = await fetch(URL + itemId, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (response.ok) {
            setSuccess(result.message || 'تم الحذف بنجاح')
            setLoading(false)
        } else {
            if (response.status == 404) {
                setError(result.message || 'عنصر السلة غير موجود');
                setLoading(false)
            } else if (response.status == 400) {
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
export default DeleteItem;

