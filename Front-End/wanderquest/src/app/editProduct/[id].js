import { useRouter } from 'next/router';

const EditProduct = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Product ID: {id}</h1>
        </div>
    );
};

export default EditProduct;
