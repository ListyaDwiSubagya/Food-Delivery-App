import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Pastikan mengimpor useSearchParams
import './Verify.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams(); // Ambil searchParams
    const success = searchParams.get("success"); // Ambil nilai 'success'
    const orderId = searchParams.get("orderId"); // Ambil nilai 'orderId'
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/order/verify", {success, orderId});
        if (response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment();
    },[])

    return (
        <div className="verify-container">
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
